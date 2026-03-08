// --- 1. THE GATEKEEPER ---
const savedUser = JSON.parse(localStorage.getItem('eduVerse_User'));

// Instant redirect if logged in
if (savedUser && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
    window.location.href = 'profile.html';
}

// --- 2. LANDING PAGE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("EduVerse System: Online");
});

// --- 3. SHOW THE LOGIN MODAL ---
// This runs when you click the "CREATE PROFILE" button
function showLogin() {
    const modal = document.getElementById('login-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// --- 4. FINALIZE ACCOUNT ---
// This runs when you click "ENTER UNIVERSE" inside the popup
function finalizeAccount() {
    const nameInput = document.getElementById('user-name-input').value;
    
    if (nameInput.trim() === "") {
        alert("Please enter a name to initialize your profile!");
        return;
    }

    const newUser = {
        name: nameInput,
        date: new Date().toLocaleDateString('en-GB'), // Matches the profile display
        stats: { discipline: 0, resilience: 0 },      // Vital for the progress bars
        levels: { discipline: 1, resilience: 1 }     // Vital for the level display
    };
    
    // Save to browser memory
    localStorage.setItem('eduVerse_User', JSON.stringify(newUser));
    
    // Teleport to dashboard
    window.location.href = 'profile.html';
}
