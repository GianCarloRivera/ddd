import React from 'react';

function LoginModal({ isOpen, onClose, onLogin, isDarkMode }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add login logic here
        console.log('Login attempt');
        onLogin();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={`modal ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal; 