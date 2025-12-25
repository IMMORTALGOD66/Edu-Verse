// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');

    if (authForm) {
        authForm.addEventListener('submit', function(event) {
            event.preventDefault(); // This stops the page from refreshing

            // 1. Grab the info from the boxes
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // 2. For now, let's just log it to see if it works
            console.log("Form submitted!");
            console.log("Email:", email);
            console.log("Password:", password);

            // 3. This is where we will eventually add the 'API' code
            alert("The 'Brain' caught your info: " + email);
        });
    }
});
