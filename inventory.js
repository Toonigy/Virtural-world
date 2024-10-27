// Select inventory elements
const inventoryButton = document.getElementById('inventoryButton');
const inventoryModal = document.getElementById('inventoryModal');
const closeModal = document.getElementById('closeModal');
const inventoryList = document.getElementById('inventoryList');

// Sample inventory items (you can modify this or add items dynamically)
const sampleInventory = [
    { name: 'Blue Hat', type: 'Accessory' },
    { name: 'Red Scarf', type: 'Accessory' },
    { name: 'Green Shirt', type: 'Clothing' },
    { name: 'Yellow Boots', type: 'Clothing' }
];

// Check if items are stored; if not, store sample items
if (!localStorage.getItem('inventory')) {
    localStorage.setItem('inventory', JSON.stringify(sampleInventory));
}

// Function to get inventory from localStorage
function getInventory() {
    return JSON.parse(localStorage.getItem('inventory')) || [];
}

// Function to display inventory in modal
function displayInventory() {
    const inventory = getInventory();
    inventoryList.innerHTML = '';  // Clear the list first

    if (inventory.length === 0) {
        inventoryList.innerHTML = '<p>No items in your inventory.</p>';
    } else {
        inventory.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - ${item.type}`;
            inventoryList.appendChild(itemElement);
        });
    }
}

// Event to open inventory modal
inventoryButton.addEventListener('click', () => {
    displayInventory();
    inventoryModal.style.display = 'block';
});

// Event to close inventory modal
closeModal.addEventListener('click', () => {
    inventoryModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === inventoryModal) {
        inventoryModal.style.display = 'none';
    }
});
