 

 // waiting for the page to fully load before executing javascript code

 document.addEventListener("DOMContentLoaded", function (){

    var loginTab = document.querySelector(".login-tab");

    var registerTab = document.querySelector(".register-tab");
    
    var loginBox = document.querySelector(".login-box");

    var registerBox = document.querySelector(".register-box");
    
    var loginForm = document.querySelector(".login-form");
    var registerForm = document.getElementById("register-form");

 }
 );

registerForm.addEventListener("submit", function (event)
{
    event.preventDefault(); 

// storing each input inside a valuable and using the trim function to remove any space
    var name = registerForm.FullName.value.trim();
    var email = registerForm.email.value.trim();
    var password = registerForm.pass.value.trim();
    var confirmPassword = registerForm.repass.value.trim();

    if(!name ||!email||!password || !confirmPassword){
        alert("Kindly fill in all the fields.");
        return;
        // checking if one of the fields is null
    }

    if(password !==confirmPassword) // if passwords don't match alert the user
    {
        alert("passwords don't match.");
        return;
    }

    var users = [] ; 
    var storedUsers = localStorage.getItem("users");
    if(storedUsers){
        users = JSON.parse(storedUsers); 
    }

    for (var i = 0 ; i<users.length ; i++){
        
        if (users[i].email == email)
        {
            alert("User with this email already exists.");

            return ; 
        }
     
    }


    var newUser = {

        name: name,
        email: email,
        password: password,
        scores: [],
    };
    users.push(newUser);

    localStorage.setItem("users",JSON.stringify(users));

    alert("Registeration successful! Please login in.");
    registerForm.reset();
    loginTab.click();
});

loginForm.addEventListener("submit", function (event){

event.preventDefault();

var email = loginForm.userEmail.value.trim();
var password = loginForm.password.value.trim();

if (!email ||!password){
    alert("Please enter both email and password");
    return;
}
var users = [];
var storedUsers = localStorage.getItem("users");

if (storedUsers){
    users = JSON.parse(storedUsers);
}

var foundUser = null;
for(var i = 0; i<users.length; i++){
    if(users[i].email == email && users[i].password === password)
    {
        foundUser = users[i];
        break;
    }
}
if(!foundUser){
    alert("Invalid email or password");
        return;
    
}

if(email ==="admin@quiz.com" && password === "admin123"){

    window.location.href="dashboard.html";
    return;
}
sessionStorage.setItem("loggedInUser",JSON.stringify(foundUser));

window.location.href = "homePage.html";

});
