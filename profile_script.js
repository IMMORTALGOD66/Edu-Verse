// --- 1. INITIAL LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
});

// --- 2. DATA LOADING FUNCTION ---
function loadUserData() {
    // Pull the data we saved from the index page
    const user = JSON.parse(localStorage.getItem('eduVerse_User'));

    // Security Check: If someone tries to visit profile.html without a name, send them back
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Update the text on the page
    document.getElementById('display-name').innerText = user.name;
    document.getElementById('display-date').innerText = user.date;

    // Update the progress bars and levels
    updateUI(user);
}

// --- 3. UI UPDATE FUNCTION ---
function updateUI(user) {
    // Discipline Update
    document.getElementById('disc-fill').style.width = user.stats.discipline + "%";
    document.getElementById('disc-lvl').innerText = "LVL " + user.levels.discipline;

    // Resilience Update
    document.getElementById('res-fill').style.width = user.stats.resilience + "%";
    document.getElementById('res-lvl').innerText = "LVL " + user.levels.resilience;
}

// --- 4. XP GAIN LOGIC ---
function addXP(type) {
    // Get the latest data from memory
    let user = JSON.parse(localStorage.getItem('eduVerse_User'));

    // Add 10% to the progress bar
    user.stats[type] += 10;

    // LEVEL UP CHECK: If stats hit 100%, reset to 0 and increase level
    if (user.stats[type] >= 100) {
        user.stats[type] = 0;
        user.levels[type] += 1;
        
        // Visual feedback for the level up
        alert(`🔥 Level Up! Your ${type} is now Level ${user.levels[type]}`);
    }

    // Save the new stats back to memory
    localStorage.setItem('eduVerse_User', JSON.stringify(user));

    // Refresh the bars on the screen
    updateUI(user);
}

// --- 5. THE "START OVER" BUTTON ---
function resetData() {
    if (confirm("Are you sure? This will delete your name and all progress.")) {
        localStorage.clear();
        window.location.href = 'index.html';
    }
}
