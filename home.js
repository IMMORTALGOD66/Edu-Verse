// Sample Data - In a real app, this would come from your Firebase or backend
const userData = {
    name: "Alex",
    grade: "9",
    totalXP: 1240,
    rank: "Rising Star",
    pillars: {
        discipline: 65,
        resilience: 40
    }
};

function initProfile() {
    // Set text content
    document.getElementById('display-name').textContent = userData.name;
    document.getElementById('display-grade').textContent = userData.grade;
    document.getElementById('total-xp').textContent = userData.totalXP.toLocaleString();
    
    const rankEl = document.getElementById('user-rank');
    if (rankEl) rankEl.textContent = `Rank: ${userData.rank}`;

    console.log("EduVerse Profile Loaded successfully.");
}

function logout() {
    // Simple alert for now, you can replace this with actual auth logout logic
    if (confirm("Are you sure you want to log out of EduVerse?")) {
        window.location.href = "login.html"; // Redirects to login
    }
}

// Initialize on load
window.onload = initProfile;
