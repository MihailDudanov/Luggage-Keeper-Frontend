// src/components/ui/Button.js
import React from 'react';

function Button({ children, className, onClick }) {
    return (
        <button
            className={`px-4 py-2 rounded-lg font-medium ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
