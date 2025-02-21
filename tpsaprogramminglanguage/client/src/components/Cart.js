import { createOrder } from '../services/api';

function Cart({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, getTotal } = useCart();

    const handleCheckout = async () => {
        try {
            const orderData = {
                items: cartItems,
                totalAmount: getTotal(),
                shippingAddress: 'User Address' // You might want to get this from a form
            };
            await createOrder(orderData);
            alert('Order placed successfully!');
            onClose();
        } catch (error) {
            alert(error.response?.data?.message || 'Checkout failed');
        }
    };

    return (
        // ... existing JSX
        <button className="checkout-btn" onClick={handleCheckout}>
            <i className="fas fa-credit-card"></i> Checkout
        </button>
        // ... rest of the JSX
    );
}

export default Cart; 