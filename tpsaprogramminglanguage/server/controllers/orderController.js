const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount, shippingAddress } = req.body;
        const order = await Order.create({
            user: req.user._id,
            items,
            totalAmount,
            shippingAddress
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 