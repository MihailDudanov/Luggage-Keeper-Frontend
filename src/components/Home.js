import React from 'react';

function Home() {
    return (
        <div className="container">
            <h1>Welcome to Luggage Keeper</h1>
            <p>Your one-stop solution for luggage management.</p>
        </div>
    );
}

export default Home;

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);