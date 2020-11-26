const getToken = () => {
    // let user = {
    //     userID: sessionStorage.getItem("userID"),
    //     username: sessionStorage.getItem("username"),
    //     email: sessionStorage.getItem("email"),
    //     token: sessionStorage.getItem("token"),
    //     password: sessionStorage.getItem("password")
    // }
    let token = window.location.href;
    return token;
}

const checkURLForToken = (url) => {
    let hasToken = false;
    if (url.includes("id_token")) {
        hasToken = true;
    }
    return hasToken;
}

const redirectToHome = () => {
    window.location.replace("https://ebookservice.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=2vn2grt0lci17j433i621sq9e5&redirect_uri=https://dev8304.d2ch83upg1gq9c.amplifyapp.com/");
}