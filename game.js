const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Avatar properties
const avatar = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 80,
    headRadius: 20,
    speed: 2,  // Movement speed
    destination: { x: canvas.width / 2, y: canvas.height / 2 }  // Default destination at the starting point
};

// Draw the avatar
function drawAvatar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Body
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(avatar.x - avatar.width / 2, avatar.y, avatar.width, avatar.height);

    // Head
    ctx.fillStyle = '#FFDAB9';
    ctx.beginPath();
    ctx.arc(avatar.x, avatar.y - avatar.headRadius - 10, avatar.headRadius, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(avatar.x - 8, avatar.y - avatar.headRadius - 10, 3, 0, Math.PI * 2);
    ctx.arc(avatar.x + 8, avatar.y - avatar.headRadius - 10, 3, 0, Math.PI * 2);
    ctx.fill();

    // Mouth
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.arc(avatar.x, avatar.y - avatar.headRadius, 8, 0, Math.PI);
    ctx.stroke();
}

// Handle canvas clicks to set a new destination for the avatar
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    avatar.destination.x = event.clientX - rect.left;
    avatar.destination.y = event.clientY - rect.top;
});

// Move the avatar towards the destination
function updateAvatarPosition() {
    const dx = avatar.destination.x - avatar.x;
    const dy = avatar.destination.y - avatar.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > avatar.speed) {
        avatar.x += (dx / distance) * avatar.speed;
        avatar.y += (dy / distance) * avatar.speed;
    } else {
        // If the avatar is close to the destination, snap to the destination
        avatar.x = avatar.destination.x;
        avatar.y = avatar.destination.y;
    }
}

// Game loop to update and draw the avatar
function gameLoop() {
    updateAvatarPosition();
    drawAvatar();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
