const navigate_user = () => {
    window.location.replace("../../Userpage/HTML/index.html");
}

const navigate_edit = () => {
    window.location.replace("../../EBookEdit/HTML/ebedit.html");
}

const delete_current = () => {
    let token = sessionStorage.getItem("token");
    let body = {
        author: sessionStorage.getItem("author"),
        title: sessionStorage.getItem("title")
    }
    axios({
        method: 'DELETE',
        url: `${BASE_URL}/api/delete/ebook`,
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
        navigate_user();
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
        content: sessionStorage.getItem("content"),
        genre: sessionStorage.getItem("genre")
    }
    let navigate_return = document.getElementById("nav_back");
    let edit_ebook = document.getElementById("edit");
    let delete_ebook = document.getElementById("delete_ebook");

    document.getElementById("title").innerHTML = `Title: ${ebook.title}`;
    document.getElementById("author").innerHTML = `Author: ${ebook.author}`;
    document.getElementById("genre").innerHTML = `Genre: ${ebook.genre}`;
    document.getElementById("year").innerHTML = `Published on: ${ebook.year}`;
    document.getElementById("ebook_contents").innerHTML = ebook.content;

    navigate_return.onclick = navigate_user;
    navigate_return.innerHTML = "Return";

    delete_ebook.innerHTML = "Delete EBook";
    delete_ebook.onclick = delete_current;

    edit_ebook.onclick = navigate_edit;
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