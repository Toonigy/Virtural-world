const canvas = document.getElementById('townCanvas');
const ctx = canvas.getContext('2d');

// Avatar properties
const avatar = {
    x: canvas.width / 2,
    y: canvas.height / 1.5,
    width: 50,
    height: 80,
    speed: 3,
    destination: { x: canvas.width / 2, y: canvas.height / 1.5 }
};

// Town boundaries
const boundaries = {
    xMin: 50,
    xMax: canvas.width - 50,
    yMin: 100,
    yMax: canvas.height - 100
};

// Sample buildings/interactive areas
const buildings = [
    { x: 100, y: 200, width: 100, height: 150, label: "Shop" },
    { x: 300, y: 100, width: 150, height: 200, label: "Library" },
    { x: 700, y: 200, width: 100, height: 150, label: "Café" }
];

// Draw the town background and buildings
function drawTown() {
    ctx.fillStyle = '#87CEEB'; // Sky color
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    ctx.fillStyle = '#228B22'; // Ground color
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    buildings.forEach(building => {
        ctx.fillStyle = '#8B4513'; // Building color
        ctx.fillRect(building.x, building.y, building.width, building.height);

        ctx.fillStyle = '#FFF';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(building.label, building.x + building.width / 2, building.y + building.height + 20);
    });
}

// Draw the avatar
function drawAvatar() {
    ctx.fillStyle = '#FFDAB9'; // Skin color for head
    ctx.beginPath();
    ctx.arc(avatar.x, avatar.y - avatar.height / 2, 20, 0, Math.PI * 2); // Head
    ctx.fill();

    ctx.fillStyle = '#4CAF50'; // Body color
    ctx.fillRect(avatar.x - 15, avatar.y - avatar.height / 2 + 20, 30, avatar.height - 20); // Body
}

// Handle canvas clicks to set new destination
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const destinationX = event.clientX - rect.left;
    const destinationY = event.clientY - rect.top;

    // Check if within boundaries
    if (destinationX > boundaries.xMin && destinationX < boundaries.xMax &&
        destinationY > boundaries.yMin && destinationY < boundaries.yMax) {
        avatar.destination.x = destinationX;
        avatar.destination.y = destinationY;
    }
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
        avatar.x = avatar.destination.x;
        avatar.y = avatar.destination.y;
    }
}

// Game loop to update and draw the town and avatar
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    drawTown();   // Draw town background and buildings
    drawAvatar(); // Draw the avatar
    updateAvatarPosition(); // Update avatar position towards destination

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
