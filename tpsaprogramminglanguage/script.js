let cart = [];

function addToCart(name, price) {
    cart.push({ name, price });
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

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\nYour burgers will be ready soon!`);
    cart = [];
    updateCart();
} 