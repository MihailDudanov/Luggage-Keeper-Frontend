import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const luggageTypes = ["BACKPACK", "SUITCASE", "DUFFEL_BAG", "BRIEFCASE", "TRAVEL_BAG", "HANDBAG"];

const LuggageList = () => {
    const [luggageList, setLuggageList] = useState([]);
    const [luggage, setLuggage] = useState({
        luggageType: "",
        weightLimit: "",
        size: "",
        availability: false,
    });

    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // Fetch luggage list from the backend
    useEffect(() => {
        axios
            .get("http://localhost:8080/api/luggage")
            .then((response) => {
                setLuggageList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching luggage list:", error);
            });
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLuggage((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Add luggage to the backend
    const handleAddLuggage = (e) => {
        e.preventDefault();
        if (!luggage.luggageType || !luggage.weightLimit || !luggage.size) {
            alert("Please fill out all fields.");
            return;
        }
        axios
            .post("http://localhost:8080/api/luggage/add", luggage)
            .then((response) => {
                setLuggageList((prev) => [...prev, response.data]);
                setLuggage({
                    luggageType: "",
                    weightLimit: "",
                    size: "",
                    availability: false,
                });
            })
            .catch((error) => {
                console.error("Error adding luggage:", error);
                alert("Failed to add luggage.");
            });
    };

    // Delete luggage from the backend
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:8080/api/luggage/delete/${id}`)
            .then(() => {
                setLuggageList((prev) => prev.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting luggage:", error);
                alert("Failed to delete luggage.");
            });
    };

    // Redirect to the ReservationList page
    const handleCreateReservation = () => {
        navigate("/reservations"); // Redirect to the reservations page
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Luggage List</h2>

            {/* Input Form */}
            <form onSubmit={handleAddLuggage} className="mb-4">
                <div className="form-group">
                    <label>Luggage Type</label>
                    <select
                        name="luggageType"
                        className="form-control"
                        value={luggage.luggageType}
                        onChange={handleChange}
                    >
                        <option value="">Select Luggage Type</option>
                        {luggageTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Weight Limit (kg)</label>
                    <input
                        type="number"
                        name="weightLimit"
                        className="form-control"
                        value={luggage.weightLimit}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Size (cm³)</label>
                    <input
                        type="number"
                        name="size"
                        className="form-control"
                        value={luggage.size}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        name="availability"
                        className="form-check-input"
                        checked={luggage.availability}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">Available</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-3">
                        Add Luggage
                    </button>
                </div>
            </form>

            {/* Luggage List */}
            <ul className="list-group mb-4">
                {luggageList.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Type:</strong> {item.luggageType}, <strong>Weight:</strong> {item.weightLimit}kg,{" "}
                            <strong>Size:</strong> {item.size}cm³, <strong>Available:</strong> {item.availability ? "Yes" : "No"}
                        </div>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div className="text-center">
                {/* Create Reservation Button */}
                <button className="btn btn-primary btn-lg mt-4" onClick={handleCreateReservation}>
                    Create Reservation
                </button>
            </div>
        </div>
    );
};

export default LuggageList;
