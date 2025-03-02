import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const OrderPage = () => {
    const [reservations, setReservations] = useState([]);
    const [selectedReservations, setSelectedReservations] = useState([]);
    // eslint-disable-next-line
    const [clientSecret, setClientSecret] = useState(null);
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
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
        fetchReservations();
    }, []);

    // const redirectToThankYouPage = () => {
    //     navigate("/orders");
    // };
    const handleReservationChange = (e) => {
        const reservationId = Number(e.target.value);
        setSelectedReservations((prevSelected) =>
            e.target.checked
                ? [...prevSelected, reservationId]
                : prevSelected.filter((id) => id !== reservationId)
        );
    };

    const totalPrice = useMemo(() => {
        return selectedReservations.reduce((total, reservationId) => {
            const selectedRes = reservations.find(res => res.id === reservationId);
            if (selectedRes?.luggage) {
                const startDate = new Date(selectedRes.startDate);
                const endDate = new Date(selectedRes.endDate);
                const lengthOfStay = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                return total + (selectedRes.luggage.weightLimit * selectedRes.luggage.size * 0.01 * lengthOfStay);
            }
            return total;
        }, 0);
    }, [selectedReservations, reservations]);

    const handlePayment = async () => {
        if (!stripe || !elements) return;

        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.post("http://localhost:8080/order/create-payment-intent",
                { amount: totalPrice * 100 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Received clientSecret:", data.clientSecret); // Debug log

            if (!data.clientSecret) {
                console.error("Error: Missing clientSecret from backend");
                return;
            }

            setClientSecret(data.clientSecret);
            const cardElement = elements.getElement(CardElement);
            const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: { card: cardElement },
            });

            if (error) {
                console.error("Payment error:", error);
            } else {
                console.log("Payment successful:", paymentIntent);
                alert("Payment successful!");
                navigate("/thank-you");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Create Order</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                    {reservations.map((reservation) => (
                        <div key={reservation.id} className="col">
                            <div className="card shadow-sm">
                                <img src="/images/home_page_photo.jpg" className="card-img-top" alt="Reservation" />
                                <div className="card-body">
                                    <h5 className="card-title">Reservation #{reservation.id}</h5>
                                    <p className="card-text">
                                        <strong>Luggage Type:</strong> {reservation.luggage.luggageType}<br />
                                        <strong>Start Date:</strong> {new Date(reservation.startDate).toLocaleString()}<br />
                                        <strong>End Date:</strong> {new Date(reservation.endDate).toLocaleString()}
                                    </p>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            value={reservation.id}
                                            onChange={handleReservationChange}
                                        />
                                        <label className="form-check-label">Select this reservation</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="form-group mb-4">
                    <label className="form-label h5">Total Price</label>
                    <input type="number" className="form-control" value={totalPrice.toFixed(2)} readOnly />
                </div>
                <div className="mb-4">
                    <CardElement />
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary btn-lg mt-4" onClick={handlePayment}  disabled={!stripe}>
                        Pay Now
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderPage;
