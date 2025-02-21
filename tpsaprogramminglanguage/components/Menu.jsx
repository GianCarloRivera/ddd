import React, { useState, useEffect } from 'react';

function Menu({ addToCart }) {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/burgers')
      .then(response => response.json())
      .then(data => {
        setBurgers(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load burgers');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="menu">
      <h2>Our Menu</h2>
      <div className="burger-grid">
        {burgers.map((burger) => (
          <div key={burger.id} className="burger-card">
            <img src={burger.image} alt={burger.name} />
            <h3>{burger.name}</h3>
            <p>{burger.description}</p>
            <p className="price">${burger.price.toFixed(2)}</p>
            <button onClick={() => addToCart(burger)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu; 