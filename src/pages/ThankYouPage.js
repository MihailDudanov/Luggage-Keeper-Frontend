import React from 'react';
import '../styles/ThankYouPage.css'; // Ensure you create this CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function ThankYouPage() {
    return (
        <div className="thank-you-container">
            <img src="/images/thank_you_bg.jpg" alt="Thank You Background" className="thank-you-image" />
            <div className="thank-you-overlay">
                <div className="card thank-you-card">
                    <div className="card-body text-center">
                        <h1 className="card-title text-light">Thank You for Your Purchase!</h1>
                        <p className="card-text text-light">Your payment was successful. We appreciate your business.</p>
                        <button className="btn btn-primary btn-lg mt-3" onClick={() => window.location.href = '/'}>Back to Home</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThankYouPage;
