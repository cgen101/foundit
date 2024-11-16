import React, { useState, useEffect } from 'react';
import { fetchLostItems, addLostItem } from '../api/item-calls.js';

const LostApp = () => {
    const [lostItems, setLostItems] = useState([]); // Store items in state
    const [formData, setFormData] = useState({
        name: '',
        color: '',
        description: '',
        location: '',
        image: '', // Add image URL to formData
    });
    const [imageFile, setImageFile] = useState(null); // Store the selected image file

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

    // Handle image file selection
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    // Upload the image to Cloudinary
    const uploadImageToCloudinary = async () => {
        if (!imageFile) {
            alert('Please select an image to upload.');
            return null;
        }

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return data.secure_url; // Get the URL of the uploaded image
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return null;
        }
    };

    // Handle form submission
    const handleFormSubmission = async (event) => {
        event.preventDefault();

        const { name, color, description, location } = formData;

        if (!name || !color || !description || !location) {
            alert('Please fill out all fields.');
            return;
        }

        const imageUrl = await uploadImageToCloudinary();
        if (!imageUrl) {
            alert('Image upload failed. Please try again.');
            return;
        }

        const newItem = { name, color, description, location, image: imageUrl };

        try {
            const addedItem = await addLostItem(newItem);
            setLostItems([...lostItems, addedItem]);
            setFormData({ name: '', color: '', description: '', location: '', image: '' });
            setImageFile(null);
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

                    <label htmlFor="itemImage">Upload Image:</label><br />
                    <input
                        type="file"
                        id="itemImage"
                        onChange={handleImageChange}
                        accept="image/*"
                    /><br /><br />

                    <label htmlFor="itemLocation">Location:</label><br />
                    <select
                        id="itemLocation"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>Select a location</option>
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
                                <p><strong>Location:</strong> {item.location}</p>
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default LostApp;
