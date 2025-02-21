import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Footer from './components/Footer';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (burger) => {
    setCart([...cart, burger]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\nYour burgers will be ready soon!`);
    setCart([]);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Menu addToCart={addToCart} />
        <Cart cart={cart} removeFromCart={removeFromCart} checkout={checkout} />
      </main>
      <Footer />
    </div>
  );
}

export default App; 