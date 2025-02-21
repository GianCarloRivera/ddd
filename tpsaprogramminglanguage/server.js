const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database (replace with real database in production)
let orders = [];

// Routes
app.get('/api/burgers', (req, res) => {
  const burgers = [
    {
      id: 1,
      name: 'Classic Burger',
      description: 'Beef patty, lettuce, tomato, cheese',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'
    },
    {
      id: 2,
      name: 'Double Cheese',
      description: 'Double patty, double cheese, bacon',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500'
    },
    {
      id: 3,
      name: 'Veggie Burger',
      description: 'Plant-based patty, avocado, sprouts',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500'
    }
  ];
  res.json(burgers);
});

app.post('/api/orders', (req, res) => {
  const { items, total } = req.body;
  const order = {
    id: orders.length + 1,
    items,
    total,
    status: 'pending',
    createdAt: new Date()
  };
  orders.push(order);
  res.status(201).json(order);
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 