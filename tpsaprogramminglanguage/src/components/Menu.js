import React from 'react';
import { useCart } from '../context/CartContext';

function Menu() {
    const { addToCart } = useCart();
    const burgers = [
        {
            id: 1,
            name: 'Classic Burger',
            price: '₱100.00',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format'
        },
        {
            id: 2,
            name: 'Cheese Burger',
            price: '₱150.00',
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&auto=format'
        },
        {
            id: 3,
            name: 'Bacon Burger',
            price: '₱200.00',
            image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&auto=format'
        }
    ];

    return (
        <section id="menu" className="menu-section">
            <h2>Our Menu</h2>
            <div className="burger-grid">
                {burgers.map(burger => (
                    <div key={burger.id} className="burger-card">
                        <img src={burger.image} alt={burger.name} />
                        <h3>{burger.name}</h3>
                        <p>{burger.price}</p>
                        <button 
                            className="add-to-cart-btn"
                            onClick={() => addToCart(burger)}
                        >
                            <i className="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Menu; 