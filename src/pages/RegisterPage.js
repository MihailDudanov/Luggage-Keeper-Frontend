import React, { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'ROLE_USER' // Default role
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        try {
            console.log(formData)
            const response = await axios.post('http://localhost:8080/authentication/register', formData);
            if ([200, 201].includes(response.status)) {
                alert('User registered successfully');
                // Optionally redirect or reset form
                window.location.pathname = '/login'
            }
        } catch (error) {
            console.error('Error response:', error)
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error response:', error.response);
                setError(error.response.data.message || 'Registration failed');
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error request:', error.request);
                setError('No response from server. Please try again later.');
            } else {
                // Something else caused the error
                console.error('Error message:', error.message);
                setError('An error occurred during registration');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="button" onClick={handleSubmit} className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
