const navigate_user = () => {
    window.location.replace("../../Userpage/HTML/index.html");
}

const edit_ebook_data = () => {
    let token = sessionStorage.getItem("token");
    let body = {
        bookID: sessionStorage.getItem("bookID"),
        password: document.getElementById("password").value,
        newTitle: null,
        newAuthor: null,
        newGenre: null,
        newYear: null
    }

    if (document.getElementById("ntitle").value) {
        body.newTitle = document.getElementById("ntitle").value.toLowerCase();
        sessionStorage.setItem("title", body.newTitle);
    }

    if (document.getElementById("nauthor").value) {
        body.newAuthor = document.getElementById("nauthor").value.toLowerCase();
        sessionStorage.setItem("author", body.newAuthor);
    }

    if (document.getElementById("ngenre").value) {
        body.newGenre = document.getElementById("ngenre").value.toLowerCase();
        sessionStorage.setItem("genre", body.newGenre);
    }

    if (document.getElementById("nyear").value) {
        body.newYear = document.getElementById("nyear").value;
        sessionStorage.setItem("year", body.newYear);
    }

    console.log(body.newTitle);
    axios({
        method: 'PUT',
        url: `${BASE_URL}/api/edit/ebook`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: body
    })
    // axios.post("http://localhost:8080/api/eBookAdd", body, header)
    .then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        window.alert(response.data.msg);
        page_populate();
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
        window.alert(error.response.data.msg);
    })
}
 
const page_populate = () => {
    let ebook = {
        title: sessionStorage.getItem("title"),
        author: sessionStorage.getItem("author"),
        year: sessionStorage.getItem("year"),
        genre: sessionStorage.getItem("genre")
    }
    let navigate_return = document.getElementById("nav_back");
    let edit_ebook = document.getElementById("edit");

    document.getElementById("title").innerHTML = `Current Title: ${ebook.title}`;
    document.getElementById("author").innerHTML = `Current Author: ${ebook.author}`;
    document.getElementById("genre").innerHTML = `Current Genre: ${ebook.genre}`;
    document.getElementById("year").innerHTML = `Current Published on: ${ebook.year}`;

    navigate_return.onclick = navigate_user;
    navigate_return.innerHTML = "Return";

    edit_ebook.onclick = edit_ebook_data;
    edit_ebook.innerHTML = "Edit EBook";
}

const main = () => {
    let user = getUser();
    if (checkUserForNull(user)) {
        redirectToHome();
    }
    page_populate();
}

main();