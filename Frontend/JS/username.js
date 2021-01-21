let change_username = () => {
    let pass = document.getElementById("old_pass").value;
    let user = doNotTrack.getElementById("new_user").value;

    console.log(pass, user);
}

let populate_page = () => {
    let button = document.getElementById("submit");
    button.innerHTML = "Change Username";
    button.onclick = change_username;
}

let main = () => {
    populate_page();
}

main();