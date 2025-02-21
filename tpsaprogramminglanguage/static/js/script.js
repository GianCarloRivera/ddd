let cart = [];

async function fetchBurgers() {
    const response = await fetch('/api/burgers/');
    const burgers = await response.json();
    return burgers;
}

async function addToCart(burgerId) {
    const response = await fetch(`/api/burgers/${burgerId}/`);
    const burger = await response.json();
    cart.push(burger);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

async function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    try {
        const response = await fetch('/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items_ids: cart.map(item => item.id),
                total: cart.reduce((sum, item) => sum + item.price, 0)
            }),
        });

        if (response.ok) {
            alert('Order placed successfully!');
            cart = [];
            updateCart();
        } else {
            alert('Failed to place order. Please try again.');
        }
    } catch (error) {
        alert('Failed to place order. Please try again.');
    }
} 