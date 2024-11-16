import React, { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return alert('Please select an image to upload.');

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'your_upload_preset'); // Replace with your preset name
    formData.append('cloud_name', 'dxkpqteye'); // Replace with your Cloudinary cloud name

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dxkpqteye/image/upload`,
        formData
      );
      setUploading(false);
      setUploadSuccess(true);
      alert('Image uploaded successfully!');
      console.log('Uploaded Image URL:', response.data.secure_url);
    } catch (error) {
      setUploading(false);
      setUploadSuccess(false);
      alert('Image upload failed. Please try again.');
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Upload an Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: '200px', marginTop: '10px' }} />}
      <button onClick={handleUpload} disabled={uploading} style={{ display: 'block', marginTop: '10px' }}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {uploadSuccess && <p>Image uploaded successfully!</p>}
    </div>
  );
};

export default UploadImage;
