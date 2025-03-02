import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Locations() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/location')
            .then(response => setLocations(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container">
            <h2>Locations</h2>
            <Link to="/locations/add" className="btn btn-primary mb-3">Add Location</Link>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {locations.map(location => (
                    <tr key={location.id}>
                        <td>{location.id}</td>
                        <td>{location.name}</td>
                        <td>
                            <Link to={`/locations/edit/${location.id}`} className="btn btn-warning me-2">Edit</Link>
                            <button className="btn btn-danger" onClick={() => handleDelete(location.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/location/delete/${id}`);
        setLocations(locations.filter(location => location.id !== id));
    } catch (error) {
        alert('Failed to delete location');
    }
};

export default Locations;