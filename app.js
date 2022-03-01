import express from "express";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import moment from "moment";
import fs from "fs";
import path from "path";
import {
    fileURLToPath
} from 'url';

const app = express();
const PORT = 3000 || process.env.PORT;
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

/*  BEGIN ENDPOINTS */

//  Homepage handler
app.get('/', async (req, res) => {
    const db = new sqlite3.Database("./database.db");
    const stmt = "SELECT rowid, * FROM articles";
    db.all(stmt, [], async (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                articles: rows
            })
        }
    });
})

//  New article handler
app.get("/create", async (req, res) => {
    res.render("create");
})

//  New article data handler
app.post("/new", async (req, res) => {
    await insertIntoDB(req.body);
    res.json({
        status: 200
    });
})

//  About handler
app.get("/about", async (req, res) => {
    res.render("about");
})

/* END ENDPOINTS */


/* BEGIN HELPER FUNCTIONS */

//  Insert into database
async function insertIntoDB(data) {
    const db = new sqlite3.Database("./database.db");
    //create table articles(title text, body text, postTime text, author text, email text, category text, team text, others text, hashtags text, attachments text);
    const stmt = "INSERT INTO articles(title, body, postTime, author, email, category, team, others, hashtags, attachments) VALUES(?,?,?,?,?,?,?,?,?,?)";
    db.run(stmt, [data.title, data.body, moment().format('MMMM Do YYYY, h:mm:ss a'), data.author, data.email, data.category, data.team, data.others, data.hashtags, data.attachments], async (err) => {
        if (err) {
            throw err;
        }
    });
}

/* END HELPER FUNCTIONS */

/* BEGIN LISTENER */

//  Start listening
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

/* END LISTENER */