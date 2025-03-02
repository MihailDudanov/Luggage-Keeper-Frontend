import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ReservationList = () => {
    const [reservations, setReservations] = useState([]);
    const [luggageList, setLuggageList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [newReservation, setNewReservation] = useState({
        luggageID: "",
        location: "",
        startDate: "",
        endDate: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages

    useEffect(() => {
        fetchReservations();
        fetchLuggageAndLocations();
    }, []);

    // Fetch all reservations
    const fetchReservations = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/reservation", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReservations(response.data.content || []);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    // Fetch available luggage and locations
    const fetchLuggageAndLocations = async () => {
        try {
            const luggageResponse = await axios.get("http://localhost:8080/api/luggage");
            setLuggageList(luggageResponse.data);

            const locationResponse = await axios.get("http://localhost:8080/api/location");
            setLocationList(locationResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewReservation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Validate date range (startDate should be before endDate)
    const validateDates = () => {
        const startDate = new Date(newReservation.startDate);
        const endDate = new Date(newReservation.endDate);

        if (startDate >= endDate) {
            setErrorMessage("Start date cannot be later than or equal to the end date.");
            return false;
        }
        setErrorMessage(""); // Clear error message if validation passes
        return true;
    };

    const navigate = useNavigate();

    const handleCreateOrder = () => {
        navigate("/orders");
    };

    // Handle reservation creation
    const handleCreateReservation = async (e) => {
        e.preventDefault();

        if (!validateDates()) {
            return; // Prevent form submission if date validation fails
        }

        const formattedReservation = {
            orderStatus: "CREATED",
            location: parseInt(newReservation.location, 10),
            startDate: new Date(newReservation.startDate).toISOString(),
            endDate: new Date(newReservation.endDate).toISOString(),
            luggageID: parseInt(newReservation.luggageID, 10),
        };

        try {
            const token = localStorage.getItem("token");
            // eslint-disable-next-line
            const response = await axios.post("http://localhost:8080/reservation/add", formattedReservation, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert("Reservation created successfully!");
            setNewReservation({ luggageID: "", location: "", startDate: "", endDate: "" });

            // Refresh reservation list
            fetchReservations();
        } catch (error) {
            console.error("Error creating reservation:", error);
            alert("Failed to create reservation.");
        }
    };

    // Handle reservation deletion
    const handleDelete = async (reservationId) => {
        if (!window.confirm("Are you sure you want to delete this reservation?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/reservation/delete/${reservationId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Remove from state
            setReservations((prev) => prev.filter((res) => res.id !== reservationId));

            alert("Reservation deleted successfully!");
        } catch (error) {
            console.error("Error deleting reservation:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to delete reservation.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Manage Reservations</h2>

            {/* Error Message */}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            {/* Reservation Creation Form */}
            <form onSubmit={handleCreateReservation} className="mb-4">
                <h4>Create New Reservation</h4>
                <div className="form-group">
                    <label>Luggage</label>
                    <select
                        name="luggageID"
                        className="form-control"
                        value={newReservation.luggageID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Luggage</option>
                        {luggageList.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.luggageType} - {item.size}cm³ - {item.weightLimit}kg
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <select
                        name="location"
                        className="form-control"
                        value={newReservation.location}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Location</option>
                        {locationList.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name} - {location.address}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        className="form-control"
                        value={newReservation.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        className="form-control"
                        value={newReservation.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary mt-3">Create Reservation</button>
                </div>
            </form>

            {/* List of Reservations */}
            <h4>Existing Reservations</h4>
            {reservations.length === 0 ? (
                <p className="text-center">No reservations found.</p>
            ) : (
                <ul className="list-group">
                    {reservations.map((reservation) => (
                        <li key={reservation.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>Reservation #{reservation.id}</strong> <br />
                                <span>Luggage: {reservation.luggage.luggageType}</span> <br />
                                <span>Location: {reservation.location.name} ({reservation.location.address})</span> <br />
                                <span>Start: {new Date(reservation.startDate).toLocaleString()}</span> <br />
                                <span>End: {new Date(reservation.endDate).toLocaleString()}</span>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(reservation.id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="text-center">
                {/* Create Reservation Button */}
                <button className="btn btn-primary btn-lg mt-4" onClick={handleCreateOrder}>
                    Create Order
                </button>
            </div>
        </div>
    );
};

export default ReservationList;
