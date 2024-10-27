// Select form elements
const authForm = document.getElementById('authForm');
const usernameInput = document.getElementById('username');
const message = document.getElementById('message');

// Handle form submission to save username
authForm.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevents page reload

    const username = usernameInput.value.trim();

    if (username) {
        // Save the username to local storage
        localStorage.setItem('username', username);

        // Show a confirmation message
        message.textContent = `Username saved as: ${username}`;
    } else {
        message.textContent = 'Please enter a valid username.';
    }
});

// Function to get the username (can be called from other files)
function getUsername() {
    return localStorage.getItem('username') || '???';
}
