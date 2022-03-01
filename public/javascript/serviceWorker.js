$('#submitBtn').click(function () {
    const articleTitle = document.getElementById("article-title").value;
    const articleAuthor = document.getElementById("article-author").value;
    const articleBody = document.getElementById("article-body").value;
    const articleCategory = document.getElementById("article-category").value;
    const authorEmail = document.getElementById("author-email").value;
    const teamName = document.getElementById("team-name").value;
    const hashtags = document.getElementById("hashtags").value;
    const otherUsers = document.getElementById("other-users").value;

    if (articleTitle && articleAuthor && articleBody && articleCategory.toLowerCase() !== "select category") {
        $.ajax({
            url: '/new',
            type: 'POST',
            data: {
                title: articleTitle,
                author: articleAuthor,
                body: articleBody,
                category: articleCategory,
                email: authorEmail,
                team: teamName,
                hashtags: hashtags,
                others: otherUsers,
                attachments: ""
            },
            success: function (result) {
                if (result.status == 200) {
                    document.getElementById("message").innerHTML = "Article added successfully";
                    document.getElementById("message").style.color = "white";
                    document.getElementById("alert").style.backgroundColor = "green";
                    //  Reset the form
                    document.getElementById("new-article-form").reset();
                }
            },
            error: function (result) {
                document.getElementById("message").innerHTML = "Something went wrong. Try again!";
                document.getElementById("message").style.color = "white";
                document.getElementById("alert").style.backgroundColor = "red";
            }
        });
    } else {
        document.getElementById("message").innerHTML = "Empty fields are not allowed.";
        document.getElementById("message").style.color = "white";
        document.getElementById("alert").style.backgroundColor = "red";
    }
});

// Custom solution for show more show less
$(".more").click(function () {
    let id = $(this).attr('id');
    let article = document.getElementById(id);
    article.classList.toggle("expand");
    $(this).text(function (i, text) {
        return text === "Expand" ? "Collapse" : "Expand";
    })
})

//  Custom solution for adding hashtags before the word
const hashtags = document.getElementById('hashtags');
hashtags.addEventListener('keydown', addHashtag, false);

function addHashtag(event) {
    if (event.keyCode === 32 && event.target.value.length) {
        event.preventDefault();

        var elem = event.target,
            val = elem.value;

        if (val.slice(-1) !== '#') {
            elem.value += ' #';
        }
    } else if (!event.target.value.length) {
        if (event.keyCode === 32) {
            event.preventDefault();
        }
        event.target.value = '#';
    }
}