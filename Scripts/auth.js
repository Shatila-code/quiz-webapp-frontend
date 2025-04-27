document.addEventListener("DOMContentLoaded", function () {

    var loginTab = document.querySelector(".login-tab");
    var registerTab = document.querySelector(".register-tab");
    var loginBox = document.querySelector(".login-box");
    var registerBox = document.querySelector(".register-box");
    
    var loginForm = document.querySelector(".login-form");
    var registerForm = document.getElementById("register-form");

    // Tab switching logic
    loginTab.addEventListener("click", function () {
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
        loginBox.classList.add("active");
        registerBox.classList.remove("active");
    });

    registerTab.addEventListener("click", function () {
        registerTab.classList.add("active");
        loginTab.classList.remove("active");
        registerBox.classList.add("active");
        loginBox.classList.remove("active");
    });

    // Registration Form Submission
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); 
        
        // Form values
        var name = registerForm.FullName.value.trim();
        var email = registerForm.email.value.trim();
        var password = registerForm.pass.value.trim();
        var confirmPassword = registerForm.repass.value.trim();
    
        if (!name || !email || !password || !confirmPassword) {
            alert("Kindly fill in all the fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords don't match.");
            return;
        }

        var users = JSON.parse(localStorage.getItem("users")) || [];
    
        // Check for existing email
        if (users.some(user => user.email === email)) {
            alert("User with this email already exists.");
            return;
        }

        var newUser = {
            name: name,
            email: email,
            password: password, 
            scores: {}
        };
        
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Please login.");
        
        registerForm.reset();
        loginTab.click(); // Switch to login tab
    });

    // Login Form Submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        var email = loginForm.userEmail.value.trim();
        var password = loginForm.password.value.trim();
        
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        var users = JSON.parse(localStorage.getItem("users")) || [];
        var foundUser = users.find(user => user.email === email && user.password === password);
        
        if (!foundUser) {
            alert("Invalid email or password");
            return;
        }

        // Admin check
        if (email === "admin@quiz.com" && password === "admin123") {
            const adminUser = {
                name: "Admin",
                email: "admin@quiz.com",
                password: "admin123",
                isAdmin: true,
                scores: []
            };
            sessionStorage.setItem("loggedInUser", JSON.stringify(adminUser));
            window.location.href = "/Pages/dashboard.html"; // Redirect to admin dashboard
            return;
        }
        
        sessionStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        window.location.href = "Pages/home.html"; // Redirect to user homepage
    });

});
