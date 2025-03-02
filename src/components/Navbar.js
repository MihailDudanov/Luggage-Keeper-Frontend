import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
    }, [user]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">LuggageKeeper</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Left-aligned menu items */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/locations">Locations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/luggages">Luggages</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reservations">Reservations</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders">Orders</Link>
                        </li>
                    </ul>

                    {/* Right-aligned Auth Buttons */}
                    <div className="ms-auto d-flex align-items-center">
                        {user ? (
                            <>
                                <span className="nav-link fw-bold">Welcome, {user.sub}</span>
                                <button className="btn btn-danger ms-2" onClick={logout}>
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
                                <Link className="btn btn-primary" to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
