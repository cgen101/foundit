import React, { useState } from 'react';
import { register } from '../api/item-calls.js';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Form Data:', formData);
            await register(formData);
            setMessage('User registered successfully!');
        } catch (error) {
            // Set a more specific error message if available
            setMessage(error.response?.data?.error || 'An error occurred. Please try again.');
        }
    };
    
    return (
        <div className="login-wrapper" style={{height: 150 + 'vh'}}>
            <div className="login-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>

                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        required 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
                </div>
        </div>
    );
};

export default Register;
