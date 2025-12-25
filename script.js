let isRegisterMode = false;

// 1. Function to switch between Login and Register
function toggleAuthMode(event) {
    if(event) event.preventDefault();
    
    isRegisterMode = !isRegisterMode;
    
    const title = document.getElementById('auth-header-title');
    const subtitle = document.getElementById('auth-header-subtitle');
    const submitBtn = document.getElementById('auth-submit-button');
    const regGroup = document.getElementById('registration-details-group');
    const loginOptions = document.getElementById('login-options-group');
    const toggleText = document.getElementById('auth-toggle-text');
    const toggleLink = document.getElementById('auth-toggle-link');

    if (isRegisterMode) {
        title.innerText = "Begin Journey";
        subtitle.innerText = "Select your character growth path.";
        submitBtn.innerText = "Register Now";
        regGroup.classList.remove('hidden');
        loginOptions.classList.add('hidden');
        toggleText.innerText = "Already have an account?";
        toggleLink.innerText = "Sign In";
    } else {
        title.innerText = "Welcome Back";
        subtitle.innerText = "Continue your growth journey.";
        submitBtn.innerText = "Sign In";
        regGroup.classList.add('hidden');
        loginOptions.classList.remove('hidden');
        toggleText.innerText = "New to EduVerse?";
        toggleLink.innerText = "Create Account";
    }
}

// 2. Handle Form Submission (The "Brain")
document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isRegisterMode) {
        const name = document.getElementById('full-name').value;
        const focus = document.getElementById('growth-focus').value;
        const confirmPass = document.getElementById('confirm-password').value;

        if (password !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        console.log("REGISTERING USER...");
        console.log("Name:", name, "| Focus Area:", focus);
        alert(`Welcome ${name}! Your profile is now set to focus on ${focus}.`);
    } else {
        console.log("LOGGING IN USER...");
        alert("Logging in with: " + email);
    }
});
