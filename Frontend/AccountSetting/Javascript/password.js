
let change_password = () => {
    if(confirm("Are you sure you want to change your password?")){
        let old_pass = document.getElementById("old_pass").value;
        let old_pass_second = document.getElementById("old_pass_second").value;
        if (old_pass === old_pass_second) { //&& old_pass === databased save password
            console.log("axios call to do stuff");
        } else {
            document.getElementById("error").innerHTML = "Current Password doesn't match";
        }
    }
}

let button_populate = () => {
    let button = document.getElementById("submit");
    button.innerHTML = "Change Password";
    button.onclick = change_password;
}


let main = () => {
    button_populate();
}

main();