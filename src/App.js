import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LocationList from './pages/LocationList';
import LuggageList from './pages/LuggageList';
import OrderList from './pages/OrderList';
import ReservationList from './pages/ReservationList';
import Footer from './components/Footer';
import AuthProvider from './AuthContext';
import ThankYouPage from "./pages/ThankYouPage"; // Import AuthProvider

const stripePromise = loadStripe("pk_test_51QxyQ2FLFd31ozcwSFwXtZcsXzOLjc8NJ3fkTmMtugJSb1d1BopRRu2DHCrkIjt1zblKvXMn0rUmoZYK1e2kWWQj00cl0be6XG");

function App() {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Navbar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/locations" element={<LocationList />} />
                            <Route path="/luggages" element={<LuggageList />} />
                            <Route path="/thank-you" element={<ThankYouPage />} />
                            {/* Wrap OrderList inside Elements */}
                            <Route
                                path="/orders"
                                element={
                                    <Elements stripe={stripePromise}>
                                        <OrderList />
                                    </Elements>
                                }
                            />
                            <Route path="/reservations" element={<ReservationList />} />
                        </Routes>
                        <Footer />
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
