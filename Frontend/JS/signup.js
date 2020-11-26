const getFormData = () => {
    let user = {
        email: document.getElementById("email").value, 
        username: document.getElementById("username").value, 
        password: document.getElementById("password").value,
        password_repeat: document.getElementById("spassword").value
    }
    return user;
}

const redirectToLanding = (msg) => {
    alert(msg);
    window.location.replace("../HTML/index.html");
}

const signUp = () => {
    let user = getFormData();
    let URL = `${BASE_URL}/api/signup`;
    axios.post(URL, user).then(res => {
        console.log(res.data.msg);
        redirectToLanding(res.data.msg);
    }).catch(e => {
        console.log(e.response.data.msg)
        alert(e.response.data.msg);
    });
}