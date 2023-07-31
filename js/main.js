let usersList = [];
let currentUser;
if (localStorage.getItem("usersList")) {
    usersList = JSON.parse(localStorage.getItem("usersList"));
}
if (localStorage.getItem("currentUser")) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
}
if (window.location.href.search("register") != -1) {
    console.log("register");
    let userName = document.querySelector("#userName");
    let userEmail = document.querySelector("#userEmail");
    let userPassword = document.querySelector("#userPassword");
    let signUpBtn = document.querySelector("#signUpBtn");
    let signInPage = signUpBtn.nextElementSibling.firstElementChild;
    let invalidName = document.createElement("div");
    let invalidEmail = document.createElement("div");
    invalidName.classList.add("text-danger", "text-start");
    invalidEmail.classList.add("text-danger", "text-start");
    userName.insertAdjacentElement("afterend", invalidName);
    userEmail.insertAdjacentElement("afterend", invalidEmail);

    signInPage.addEventListener("click", function () {
        window.location.assign(`index.html`);
    })
    signUpBtn.addEventListener("click", function () {
        console.log("clicked");
        addUser();
    })

    function validateName(name) {
        if (name.length > 2) {
            if (!checkName(name)) {
                return true;
            } else {
                invalidName.innerHTML = "This user name is used";
                return false;
            }
        } else {
            invalidName.innerHTML = "user name must be more than 2 letters";
            return false;
        }

    };

    function validateEmail(email) {
        let regex = /^[\w-]+@\w+\.\w{2,3}/;
        if (regex.test(email)) {
            if (!checkEmail(email)) {
                return true;
            } else {
                invalidEmail.innerHTML = "This Email already have an account";
                return false;
            }
        } else {
            invalidEmail.innerHTML = "This is invalid Email";
            return false;
        }
    }

    function addUser() {
        validateName(userName.value);
        validateEmail(userEmail.value);
        if (validateName(userName.value) && validateEmail(userEmail.value)) {
            let user = { name: userName.value, email: userEmail.value, password: userPassword.value }
            usersList.push(user);
            localStorage.setItem("usersList", JSON.stringify(usersList));
            window.location.assign(`index.html`);
        }
    }

}
else if (window.location.href.search("home") == -1 && window.location.href.search("register") == -1) {
    console.log("index");
    let signInEmail = document.querySelector("#signInEmail");
    let signInPassword = document.querySelector("#signInPassword");
    let signInBtn = document.querySelector("#signInBtn");
    let signUpPage = signInBtn.nextElementSibling.firstElementChild;
    let invalidPassword = document.createElement("div");
    let invalidEmail = document.createElement("div");
    invalidPassword.classList.add("text-danger", "text-start");
    invalidEmail.classList.add("text-danger", "text-start");
    signInPassword.insertAdjacentElement("afterend", invalidPassword);
    signInEmail.insertAdjacentElement("afterend", invalidEmail);

    signUpPage.addEventListener("click", function () {
        window.location.assign(`register.html`);
    })

    signInBtn.addEventListener("click", function () {
        searchUser();
    })
    function searchUser() {
        if (checkEmail(signInEmail.value)) {
            let user = checkEmail(signInEmail.value);
            if (checkPassword(user.password, signInPassword.value)) {
                localStorage.setItem("currentUser", JSON.stringify(user.name));
                window.location.assign(`home.html`);
                return true;
            }
            else {
                invalidPassword.innerHTML = "This password is incorrect";
                localStorage.removeItem("currentUser");
                return false;
            }
        } else {
            invalidEmail.innerHTML = "This Email is not Registered";
            localStorage.removeItem("currentUser");
            return false;
        }
    }




} else if (window.location.href.search("home") != -1) {
    console.log("home");
    let welcome = document.querySelector(".welcome");
    let logOutBtn = document.querySelector("#logOutBtn");
    let welcomeline = document.createElement("h1");


    welcomeline.innerHTML = `Welcome ${currentUser}`;
    welcome.appendChild(welcomeline);

    logOutBtn.addEventListener("click", function () {
        window.location.assign(`index.html`);
    })
}


function checkName(name) {
    let len = usersList.length;
    for (user of usersList) {
        if (user.name == name) {
            return true;
        }
    }
    return false;
}
function checkEmail(email) {
    let len = usersList.length;
    for (user of usersList) {
        if (user.email == email) {
            return user;
        }
    }
    return false;
}
function checkPassword(userPassword, inputPassword) {
    return userPassword == inputPassword;
}