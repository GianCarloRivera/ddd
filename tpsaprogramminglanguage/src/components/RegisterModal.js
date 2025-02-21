import React from 'react';

function RegisterModal({ isOpen, onClose, onRegister }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add registration logic here
        console.log('Register attempt');
        onRegister();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <input type="password" placeholder="Confirm Password" required />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterModal; 