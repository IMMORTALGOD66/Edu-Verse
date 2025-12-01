// auth-toggle.js - Handles switching between Login and Register forms

// Variable to track the current mode (true = Login, false = Register)
let isLoginMode = true;

// Element references
const form = document.getElementById('auth-form');
const title = document.getElementById('auth-header-title');
const subtitle = document.getElementById('auth-header-subtitle');
const submitButton = document.getElementById('auth-submit-button');
const toggleText = document.getElementById('auth-toggle-text');
const toggleLink = document.getElementById('auth-toggle-link');
const loginOptions = document.getElementById('login-options-group');
const confirmPasswordGroup = document.getElementById('confirm-password-field-group');

window.toggleAuthMode = function(event) {
    event.preventDefault(); // Prevents the link from jumping to the top of the page
    isLoginMode = !isLoginMode; // Flip the mode

    // Reset required state on all fields before switching modes
    document.getElementById('confirm-password').removeAttribute('required');

    if (isLoginMode) {
        // --- SWITCHING TO LOGIN MODE ---
        
        // 1. Update text content
        title.textContent = 'Welcome Back!';
        subtitle.textContent = 'Sign in to access your Digital Growth Profile.';
        submitButton.textContent = 'Sign In';
        toggleText.textContent = 'New to EduVerse?';
        toggleLink.textContent = 'Create a free account';
        
        // 2. Update form fields and action
        form.action = '/api/login';
        confirmPasswordGroup.classList.add('hidden'); // Hide Confirm Password
        loginOptions.classList.remove('hidden'); // Show Remember Me / Forgot Password
        

    } else {
        // --- SWITCHING TO REGISTER MODE ---
        
        // 1. Update text content
        title.textContent = 'Create Your Growth Profile';
        subtitle.textContent = 'Start your personalized learning journey today!';
        submitButton.textContent = 'Register Account';
        toggleText.textContent = 'Already have an account?';
        toggleLink.textContent = 'Sign In';

        // 2. Update form fields and action
        form.action = '/api/register';
        confirmPasswordGroup.classList.remove('hidden'); // Show Confirm Password
        loginOptions.classList.add('hidden'); // Hide Remember Me / Forgot Password

        // 3. Add 'required' attribute to visible fields
        document.getElementById('confirm-password').setAttribute('required', 'required');
    }
}
