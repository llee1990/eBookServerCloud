let upload_file = async (data) => {
    let file;
    let reader;
    let contents;

    try {
        file = document.getElementById("eBook").files[0];
        reader = new FileReader();
        let promise = new Promise((resolve, reject) => {
            reader.onload = () => {
                contents = reader.result;
                data["content"] = contents;
                resolve(contents);
            }
            reader.readAsText(file);
        });
        await promise;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without choosing an appropriate file!";
        Promise.reject();
    }
}

let upload_title = (data) => {
    try {
        let title = document.getElementById("title").value.toLowerCase();
        if (title === "") {
            throw "Empty";
        }
        data["title"] = title;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without a title!";
    }
}

let upload_author = (data) => {
    try {
        let author = document.getElementById("author").value.toLowerCase();
        if (author === "") {
            throw "Empty";
        }
        data["author"] = author;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without an author!";
    }
}

let upload_year = (data) => {
    try {
        let year = parseInt(document.getElementById("year").value);
        if (year === null) {
            throw "Empty";
        }
        data["year"] = year;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without a publication year!";
    }
}

let upload_genre = (data) => {
    try {
        let genre = document.getElementById("genre").value.toLowerCase();
        if (genre === "") {
            throw "Empty";
        }
        data["genre"] = genre;
    } catch(err) {
        document.getElementById("error").innerHTML = "Cannot upload without an genre!";
    }
}

let check_values = (data) => {
    if (data["title"] === "" || data["author"] === "" || data["year"] === "" || data["contents"] ==="") {
        return false;
    } else {
        return true;
    }
}

let upload_call = (data) => {
    console.log("sending", data["contents"]);
}

let upload_function = async () => {
    let data = {
        title: "", 
        author: "", 
        year: null, 
        content: "",
        genre: ""};
    upload_title(data);
    upload_author(data);
    upload_year(data);
    upload_genre(data);
    await upload_file(data);
    if (check_values(data)) {
        // testing();
        uploadEBookToDB(data);
        // upload_call(data);
    }
    
}

let navigate_user_page = () => {
    window.location.replace("../../UserPage/HTML/index.html");
}

const uploadEBookToDB = (body) => {
    let token = sessionStorage.getItem("token");
    // const header = {
    //     'Content-Type': 'application/json',
    //     'x-access-token': token
    // }
    console.log(body);
    axios({
        method: 'POST',
        url: `${BASE_URL}/api/add/ebook`,
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
        navigate_user_page();
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
    })
}

let main = () => {
    let user = getUser();
    let button = document.getElementById("submit");
    let return_button = document.getElementById("return");

    if (checkUserForNull(user)) {
        redirectToHome();
    }

    button.innerHTML = "Submit";
    button.onclick = upload_function;

    return_button.innerHTML = "Return to User Page";
    return_button.onclick = navigate_user_page;
}

main();