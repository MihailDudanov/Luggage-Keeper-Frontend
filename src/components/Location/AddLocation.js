import React, { useState } from 'react';
import { createLocation } from './services/locationService';

const LocationCreateComponent = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await createLocation({ name, address });
            // Redirect or show success message
        } catch (error) {
            setErrorMessage('Failed to create location');
        }
    };

    return (
        <div>
            <h2>Create Location</h2>
            <form onSubmit={handleCreate}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p>{errorMessage}</p>}
                <button type="submit">Create Location</button>
            </form>
        </div>
    );
};

export default LocationCreateComponent;
