 

 // waiting for the page to fully load before executing javascript code

 document.addEventListener("DOMContentLoaded", function ()){

    var loginTab = document.querySelector(".login-tab");

    var registerTab = document.querySelector(".register-tab");
    
    var loginBox = document.querySelector(".login-box");

    var registerBox = document.querySelector(".register-box");
    
    var loginForm = document.querySelector(".login-form");
    var registerForm = document.getElementById("register-form");

 }
  
 // added an event listener to switch between the two tabs 
 
loginTab.addEventListener("click", function()

{

    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginBox.classList.add("active");
    registerBox.classList.remove("active");
});

registerTab.addEventListener("click", function()

{

    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerBox.classList.add("active");
    loginBox.classList.remove("active");
});

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
})