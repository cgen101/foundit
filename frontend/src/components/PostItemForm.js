import React, { useState } from 'react';
import axios from 'axios';

const PostItemForm = () => {
  const [formData, setFormData] = useState({
    item_location: '',
    item_name: '',
    item_color: '',
    item_description: '',
    item_picture: null,
    item_flag: 'found', // Default to "found"
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, item_picture: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.item_picture) {
      setMessage('Please upload an image before submitting.');
      return;
    }

    const form = new FormData();
    form.append('file', formData.item_picture);
    form.append('upload_preset', 'your_upload_preset'); 
    form.append('cloud_name', 'dxkpqteye'); 

    try {
      setUploading(true);

      // Upload the image to Cloudinary
      const uploadResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dxkpqteye/image/upload',
        form
      );

      const imageUrl = uploadResponse.data.secure_url;

      // Post item data to backend API
      const response = await axios.post('/api/upload-item', {
        ...formData,
        item_picture: imageUrl, // Include the Cloudinary URL
      });

      setUploading(false);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading item:', error);
      setUploading(false);
      setMessage('Error posting item. Please try again.');
    }
  };

  return (
    <div>
      <h2>Post a Found Item</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="item_location"
            value={formData.item_location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Item Color:</label>
          <input
            type="text"
            name="item_color"
            value={formData.item_color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Item Description:</label>
          <textarea
            name="item_description"
            value={formData.item_description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload Picture:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required />
          {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Post Item'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostItemForm;