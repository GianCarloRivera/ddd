import React from 'react';
import { useCart } from '../context/CartContext';

function Cart({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

    if (!isOpen) return null;

    return (
        <div className="cart-modal">
            <div className="cart-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2><i className="fas fa-shopping-cart"></i> Your Cart</h2>
                
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p>{item.price}</p>
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                            >-</button>
                                            <span>{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >+</button>
                                        </div>
                                    </div>
                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-total">
                            <h3>Total: ₱{getTotal().toFixed(2)}</h3>
                            <button className="checkout-btn" onClick={() => alert('Checkout functionality coming soon!')}>
                                <i className="fas fa-credit-card"></i> Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart; 