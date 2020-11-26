const getUser = () => {
    let user = {
        userID: sessionStorage.getItem("userID"),
        username: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email"),
        token: sessionStorage.getItem("token"),
        password: sessionStorage.getItem("password")
    }
    return user;
}

const checkUserForNull = (user) => {
    let isNull = false;
     Object.keys(user).forEach(key => {
       if (user[key] == null) {
        isNull = true;
       }
     });
     return isNull;
}

const redirectToHome = () => {
    window.location.replace("../../LandingPage/HTML/index.html");
}