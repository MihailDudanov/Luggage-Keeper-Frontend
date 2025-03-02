import React, {useContext, useEffect} from 'react';
import '../styles/HomePage.css' // Corrected CSS import path
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthContext} from "../AuthContext"; // Import Bootstrap CSS

function HomePage() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
    }, [user]);

    return (
        <div className="hero">
            <img src="/images/home_page_photo.jpg" alt="LuggageKeeper Background" className="hero-image" />
            <div className="hero-overlay">
                <div className="form-container">
                    <div>
                        <div className="card-body">
                            <h1 className="card-title text-light">Welcome to LuggageKeeper</h1>
                            <p className="card-text text-light">Your one-stop solution for safe and secure luggage storage.</p>
                            <div className="d-flex justify-content-between">
                                {user == null ? (
                                        <>
                                            <button className="btn btn-primary btn-lg" onClick={() => window.location.href = '/login'}>Login</button>
                                            <button className="btn btn-success btn-lg" onClick={() => window.location.href = '/register'}>Register</button>
                                        </>
                                ) : (<></>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default HomePage;