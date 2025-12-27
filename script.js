let isRegisterMode = false;

// 1. Toggles the UI between Sign In and Register
function toggleAuthMode(event) {
    if(event) event.preventDefault();
    isRegisterMode = !isRegisterMode;
    
    const title = document.getElementById('auth-header-title');
    const subtitle = document.getElementById('auth-header-subtitle');
    const submitBtn = document.getElementById('auth-submit-button');
    const regGroup = document.getElementById('registration-details-group');
    const loginOptions = document.getElementById('login-options-group');
    const toggleLink = document.getElementById('auth-toggle-link');
    const toggleText = document.getElementById('auth-toggle-text');

    if (isRegisterMode) {
        title.innerText = "Join EduVerse";
        subtitle.innerText = "Create your account to start growing.";
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

// 2. The main "Brain" that handles button clicks
document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (isRegisterMode) {
        // --- REGISTRATION LOGIC ---
        const name = document.getElementById('full-name').value;
        const grade = document.getElementById('grade').value;
        const confirmPass = document.getElementById('confirm-password').value;

        if (!name || !grade) {
            alert("Please fill in your name and grade.");
            return;
        }

        if (password !== confirmPass) {
            alert("Passwords do not match!");
            return;
        }

        // Create the user object
        const newUser = {
            name: name,
            grade: grade,
            email: email,
            password: password 
        };

        // Save to browser memory (Local Storage)
        localStorage.setItem('userData', JSON.stringify(newUser));

        alert("Registration Successful! Now you can Sign In.");
        toggleAuthMode(); // Switch back to login mode automatically
        
    } else {
        // --- LOGIN LOGIC ---
        // Get the saved user from memory
        const savedUser = JSON.parse(localStorage.getItem('userData'));

        if (savedUser && savedUser.email === email && savedUser.password === password) {
            alert("Login Successful! Redirecting to your Profile...");
            // This sends the user to the next page
            window.location.href = "profile-view.html"; 
        } else {
            alert("Account not found or wrong password. Have you registered yet?");
        }
    }
});
