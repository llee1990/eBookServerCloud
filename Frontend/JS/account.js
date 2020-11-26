const edit_user = () => {
    let token = sessionStorage.getItem("token");

    let body = {
        oldPassword: document.getElementById("password").value,
        newUsername: null,
        newEmail: null,
        newPassword: null
    }

    if (document.getElementById("nusername").value) {
        body.newUsername = document.getElementById("nusername").value.toLowerCase();
    }

    if (document.getElementById("nemail").value) {
        body.newEmail = document.getElementById("nemail").value.toLowerCase();
    }

    if (document.getElementById("npassword").value) {
        body.newPassword = document.getElementById("npassword").value.toLowerCase();
    }

    axios({
        method: 'PUT',
        url: `${BASE_URL}/api/edit/user`,
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
        window.alert(`${response.data.msg}: Please Relog Back In!`);
        sessionStorage.clear();
        window.location.replace("../../LandingPage/HTML/index.html");
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
        window.alert(error.response.data.msg);
    })
}

const delete_account = () => {
    token = sessionStorage.getItem("token");

    axios({
        method: 'DELETE',
        url: `${BASE_URL}/api/delete/user`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(response => {
        console.log("=====SUCCESSSS======")
        console.log(JSON.stringify(response.data))
        window.alert(response.data.msg);
        sessionStorage.clear();
        window.location.replace("../../LandingPage/HTML/index.html");
    }).catch(error => {
        console.log("==========FAILED================")
        console.log(error.response.data.msg)
        window.alert(error.response.data.msg);
    })
}

const navigate_back = () => {
    window.location.replace("../../UserPage/HTML/index.html");
}

const page_populate = () => {
    let username = sessionStorage.getItem("username");
    let email = sessionStorage.getItem("email");
    let edit = document.getElementById("edit");
    let delete_current = document.getElementById("user_delete");
    let nav_back = document.getElementById("nav_back");

    document.getElementById("username").innerHTML = `Username: ${username}`;
    document.getElementById("email").innerHTML = `Email: ${email}`;

    edit.innerHTML = "Edit Account";
    edit.onclick = edit_user;

    delete_current.innerHTML = "Delete Account";
    delete_current.onclick = delete_account;

    nav_back.innerHTML = "Return";
    nav_back.onclick = navigate_back;
}

const main = () => {
    let user = getUser();
    if (checkUserForNull(user)) {
        redirectToHome();
    }
    page_populate();
}

main();