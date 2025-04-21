document.addEventListener("DOMContentLoaded", function () {
    const loggedInUserStr = sessionStorage.getItem("loggedInUser");
    const userTableBody = document.getElementById("userTableBody");
    const dashboardHeader = document.getElementById("dashboardHeader");
    const logoutButton = document.getElementById("dashboardLogoutBtn");

    let isAdmin = false;
    if (loggedInUserStr) {
        const loggedInUser = JSON.parse(loggedInUserStr);
        if (loggedInUser.email === "admin@quiz.com") {
            isAdmin = true;
        }
    }

    if (!isAdmin) {
        alert("Access Denied. You must be an admin to view this page.");
        window.location.href = "../index.html";
        return; 
    }
    const loggedInUser = JSON.parse(loggedInUserStr);
    if (dashboardHeader) {
        dashboardHeader.innerHTML = `
            <h1>Welcome, ${escapeHTML(loggedInUser.name)}!</h1>
            <p>Admin Dashboard</p>
        `;
    } else {
        console.warn("Dashboard header element not found.");
    }

    function loadUserData() {
        if (!userTableBody) {
            console.error("User table body element not found.");
            return;
        }

        const usersStr = localStorage.getItem("users");
        const users = usersStr ? JSON.parse(usersStr) : [];

        userTableBody.innerHTML = "";

        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="4">No registered users found.</td></tr>';
            return;
        }

        users.forEach((user) => {
            if (user.email === "admin@quiz.com") return;

            if (user.scores && Object.keys(user.scores).length > 0) {
                for (const quizId in user.scores) {
                    const scoreData = user.scores[quizId];
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${escapeHTML(user.name)}</td>
                        <td>${escapeHTML(user.email)}</td>
                        <td>${escapeHTML(scoreData.quizName || "Unknown Quiz")}</td>
                        <td>${scoreData.score}/${scoreData.total}</td>
                    `;
                    userTableBody.appendChild(row);
                }
            } else {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${escapeHTML(user.name)}</td>
                    <td>${escapeHTML(user.email)}</td>
                    <td>No quizzes taken yet</td>
                    <td>-</td>
                `;
                userTableBody.appendChild(row);
            }
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.removeItem("loggedInUser");
            alert("Admin logged out.");
            window.location.href = "../index.html"; 
        });
    } else {
        console.warn("Dashboard logout button not found.");
    }

    function escapeHTML(str) {
         if (typeof str !== "string") {
            console.warn("escapeHTML called with non-string value:", str);
            return str; 
        }
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

     loadUserData();
});