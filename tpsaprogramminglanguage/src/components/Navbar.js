import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar({ onLoginClick, onRegisterClick, isLoggedIn, isDarkMode, onCartClick }) {
    const { cartItems } = useCart();
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className={isDarkMode ? 'dark-mode' : ''}>
            <div className="logo">Tasty Burgers</div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/contact">Contact</Link>
                {isLoggedIn && (
                    <Link to="/profile" className="profile-link">
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                    </Link>
                )}
                <button onClick={onLoginClick}>Login</button>
                <button onClick={onRegisterClick}>Register</button>
                <button className="cart-btn" onClick={onCartClick}>
                    <i className="fas fa-shopping-cart"></i>
                    {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                </button>
            </div>
        </nav>
    );
}

export default Navbar; 