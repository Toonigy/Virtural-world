document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    // Save user data to local storage (basic simulation of database)
    localStorage.setItem(username, password);

    alert('Signup successful! You can now login.');
    window.location.href = 'login.html';
});

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if username exists and password matches
    if (localStorage.getItem(username) === password) {
        alert('Login successful!');
        // Redirect to the game page (you'll need to create this)
        window.location.href = 'game.html';
    } else {
        alert('Invalid username or password.');
    }
});
