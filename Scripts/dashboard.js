document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser") || {};
    if (user.email !== "admin@quiz.com") {
        alert("Access Denied. Admin only.");
        return window.location.href = "../index.html";
    }

    const header = document.getElementById("dashboardHeader");
    if (header) header.innerHTML = `<h1>Welcome, ${user.name}!</h1><p>Admin Dashboard</p>`;

    const tableBody = document.getElementById("userTableBody");
    if (tableBody) {
        const users = JSON.parse(localStorage.getItem("users") || "[]")
            .filter(u => u.email !== "admin@quiz.com");
        
        tableBody.innerHTML = users.length 
            ? users.map(user => {
                if (!user.scores) return `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>No quizzes taken</td>
                        <td>-</td>
                    </tr>`;
                
                return Object.values(user.scores).map(score => `
                    <tr>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${score.quizName || "Unknown Quiz"}</td>
                        <td>${score.score}/${score.total}</td>
                    </tr>`).join("");
            }).join("")
            : '<tr><td colspan="4">No users found</td></tr>';
    }

    const logoutBtn = document.getElementById("dashboardLogoutBtn");
    if (logoutBtn) logoutBtn.onclick = () => {
        sessionStorage.removeItem("loggedInUser");
        window.location.href = "../index.html";
    };
});
