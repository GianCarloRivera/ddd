import React from 'react';

function Cart({ cart, removeFromCart, checkout }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          total: total
        }),
      });

      if (response.ok) {
        alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\nYour burgers will be ready soon!`);
        checkout();
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <section className="cart">
      <h2>Your Cart</h2>
      <div id="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
            <button 
              className="remove-btn" 
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div id="cart-total">Total: ${total.toFixed(2)}</div>
      <button onClick={handleCheckout} className="checkout-btn">
        Checkout
      </button>
    </section>
  );
}

export default Cart; 