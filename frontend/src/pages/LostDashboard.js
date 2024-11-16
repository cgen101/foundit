import React, { useState, useEffect } from 'react';
import { fetchLostItems, addLostItem } from '../api/item-calls.js';

const LostApp = () => {
    const [lostItems, setLostItems] = useState([]); // Store items in state
    const [formData, setFormData] = useState({
        name: '',
        color: '',
       
        description: '',
        location: '', // Add location to form data
    });

    useEffect(() => {
        // Fetch and render lost items when the component is mounted
        const fetchAndRenderLostItems = async () => {
            try {
                const items = await fetchLostItems();
                setLostItems(items);
            } catch (error) {
                console.error('Error fetching lost items:', error);
            }
        };

        fetchAndRenderLostItems();
    }, []);

    // Handle form data change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleFormSubmission = async (event) => {
        event.preventDefault();

        const { name, color,  description, location } = formData;

        if (!name || !color || !description || !location) {
            alert('Please fill out all fields.');
            return;
        }

        const newItem = { name, color, description, location };

        try {
            const addedItem = await addLostItem(newItem);
            setLostItems([...lostItems, addedItem]);
            setFormData({ name: '', color: '', description: '', location: '' });
            alert('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Lost and Found Submission</h1>

            <div id="postItem">
                <h2>Add a Lost Item</h2>
                <form id="addItemForm" onSubmit={handleFormSubmission}>
                    <label htmlFor="itemName">Item Name:</label><br />
                    <input
                        type="text"
                        id="itemName"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    /><br /><br />

                    <label htmlFor="itemColor">Color:</label><br />
                    <input
                        type="text"
                        id="itemColor"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        required
                    /><br /><br />

                    <label htmlFor="itemCategory">Category:</label><br />
                    <select
                        id="itemCategory"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled selected>Select a category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Stationery">Stationery</option>
                        <option value="Others">Others</option>
                    </select><br /><br />

                    {/* Location Dropdown placed above the Description */}
                    <label htmlFor="itemLocation">Location:</label><br />
                    <select
                        id="itemLocation"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled selected>Select a location</option>
                        <option value="JCK">JCK</option>
                        <option value="RFM">RFM</option>
                        <option value="Alkek Library">Alkek Library</option>
                        <option value="LBJ Student Center">LBJ Student Center</option>
                        <option value="Other">Other</option>
                    </select><br /><br />

                    <label htmlFor="itemDescription">Description:</label><br />
                    <textarea
                        id="itemDescription"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        required
                    ></textarea><br /><br />

                    <button type="submit">Add Item</button>
                </form>
            </div>

            <div id="allItems" className="item-list">
                <h3>Lost Items</h3>
                <div id="itemsContainer">
                    {lostItems.length === 0 ? (
                        <p>No items found.</p>
                    ) : (
                        lostItems.map((item, index) => (
                            <div key={index} className="item">
                                <p><strong>Name:</strong> {item.name}</p>
                                <p><strong>Color:</strong> {item.color}</p>
                               
                                <p><strong>Description:</strong> {item.description}</p>
                                <p><strong>Location:</strong> {item.location}</p> {/* Display location */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LostApp;
