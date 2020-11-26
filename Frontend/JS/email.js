let change_email = () => {
    let pass = document.getElementById("old_pass").value;
    let email = doNotTrack.getElementById("new_email").value;

    console.log(pass, email);
}

let populate_page = () => {
    let button = document.getElementById("submit");
    button.innerHTML = "Change Email";
    button.onclick = change_email;
}

let main = () => {
    populate_page();
}

main();