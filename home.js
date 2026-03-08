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
// Function to update a specific growth pillar
function updateStat(pillarId, amount) {
    // pillarId should be 'discipline' or 'resilience'
    const pillar = userData.pillars[pillarId];
    
    // Update the data
    pillar.xp += amount;
    
    // Check for Level Up (every 100 XP for this example)
    if (pillar.xp >= 100) {
        pillar.level += 1;
        pillar.xp = pillar.xp - 100; // Reset XP but keep the overflow
        alert(`CONGRATS! Your ${pillarId} leveled up to LVL ${pillar.level}!`);
    }

    // Refresh the UI
    renderStats();
}

// Function to sync the UI with the data
function renderStats() {
    // Discipline Update
    const discBar = document.querySelector('.stat-card:nth-child(1) .progress-fill');
    const discLvl = document.querySelector('.stat-card:nth-child(1) .bg-indigo-600');
    discBar.style.width = `${userData.pillars.discipline.xp}%`;
    discLvl.textContent = `LVL ${userData.pillars.discipline.level}`;

    // Resilience Update
    const resBar = document.querySelector('.stat-card:nth-child(2) .progress-fill');
    const resLvl = document.querySelector('.stat-card:nth-child(2) .bg-emerald-600');
    resBar.style.width = `${userData.pillars.resilience.xp}%`;
    resLvl.textContent = `LVL ${userData.pillars.resilience.level}`;
}

// Update your userData object to track levels properly
const userData = {
    name: "Alex",
    pillars: {
        discipline: { xp: 65, level: 2 },
        resilience: { xp: 40, level: 1 }
    }
};
