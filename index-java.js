// --- 1. THE GATEKEEPER ---
// Check if the user is already "Logged In"
const savedUser = JSON.parse(localStorage.getItem('eduVerse_User'));

// If a user exists AND we are currently on index.html, skip to profile
if (savedUser && window.location.pathname.includes('index.html')) {
    window.location.href = 'profile.html';
}

// --- 2. LANDING PAGE LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("EduVerse System: Online");

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
        });
    }
});

// --- 3. THE "START" FUNCTION ---
// This runs when they click "Create Profile" for the first time
function createFirstProfile() {
    const newUser = {
        name: "Explorer",
        joinedDate: new Date().toLocaleDateString(),
        xp: 0,
        level: 1
    };
    
    // Save them to memory
    localStorage.setItem('eduVerse_User', JSON.stringify(newUser));
    
    // Send them to the profile
    window.location.href = 'profile.html';
}
