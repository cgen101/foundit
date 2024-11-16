import { fetchLostItems, addLostItem } from '../api/item-calls.js';

// Inject HTML Structure
const injectHTML = () => {
    document.body.innerHTML = `
        <h1>Lost and Found Submission</h1>

        <div id="postItem">
            <h2>Add a Lost Item</h2>
            <form id="addItemForm">
                <label for="itemName">Item Name:</label><br>
                <input type="text" id="itemName" name="itemName" required><br><br>

                <label for="itemColor">Color:</label><br>
                <input type="text" id="itemColor" name="itemColor" required><br><br>

                <label for="itemCategory">Category:</label><br>
                <select id="itemCategory" name="itemCategory" required>
                    <option value="" disabled selected>Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Stationery">Stationery</option>
                    <option value="Others">Others</option>
                </select><br><br>

                <label for="itemDescription">Description:</label><br>
                <textarea id="itemDescription" name="itemDescription" rows="4" required></textarea><br><br>

                <button type="submit">Add Item</button>
            </form>
        </div>

        <div id="allItems" class="item-list">
            <h3>Lost Items</h3>
            <div id="itemsContainer"></div>
        </div>
    `;
};

// Render Lost Items
const renderItems = (lostItems) => {
    const container = document.getElementById('itemsContainer');
    container.innerHTML = '';
    if (lostItems.length === 0) {
        container.innerHTML = '<p>No items found.</p>';
        return;
    }
    lostItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Color:</strong> ${item.color}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><strong>Description:</strong> ${item.description}</p>
        `;
        container.appendChild(itemDiv);
    });
};

// Fetch and Render Lost Items
const fetchAndRenderLostItems = async (lostItems) => {
    try {
        const items = await fetchLostItems();
        lostItems.push(...items);
        renderItems(lostItems);
    } catch (error) {
        console.error('Error fetching lost items:', error);
    }
};

// Handle Form Submission
const handleFormSubmission = async (event, lostItems) => {
    event.preventDefault();

    const name = document.getElementById('itemName').value;
    const color = document.getElementById('itemColor').value;
    const category = document.getElementById('itemCategory').value;
    const description = document.getElementById('itemDescription').value;

    if (!name || !color || !category || !description) {
        alert('Please fill out all fields.');
        return;
    }

    const newItem = { name, color, category, description };

    try {
        const addedItem = await addLostItem(newItem);
        lostItems.push(addedItem);
        renderItems(lostItems);
        document.getElementById('addItemForm').reset();
        alert('Item added successfully!');
    } catch (error) {
        console.error('Error adding item:', error);
        alert('An error occurred. Please try again later.');
    }
};

// Initialize App
const LostApp = () => {
    const lostItems = []; // Store items locally for rendering

    injectHTML(); // Inject HTML structure

    fetchAndRenderLostItems(lostItems); // Fetch and render initial items

    // Attach form submission handler
    document.getElementById('addItemForm').addEventListener('submit', (event) => {
        handleFormSubmission(event, lostItems);
    });
};

export default LostApp;
