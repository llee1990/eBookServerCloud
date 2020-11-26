const getFormData = () => {
    let user = {
        username: document.getElementById("username").value, 
        password: document.getElementById("password").value
    }
    return user;
}

const redirectToHome = () => {
    window.location.replace("../../UserPage/HTML/index.html");
}

const setSessionStorage = (user) => {
    sessionStorage.setItem("username", user.user.username);
    sessionStorage.setItem("email", user.user.email);
    sessionStorage.setItem("userID", user.user.id);
    sessionStorage.setItem("token", user.token);
    sessionStorage.setItem("password", user.user.password);
}

const login = () => {
    let user = getFormData();
    let URL = `${BASE_URL}/api/login`;
    axios.post(URL, user).then(res => {
        console.log(res.data);
        setSessionStorage(res.data);
        redirectToHome();
    }).catch(e => {
        console.log(e.response.data.msg)
        alert(e.response.data.msg);
    });
}