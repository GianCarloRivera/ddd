// Get modal elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const closeBtns = document.getElementsByClassName('close');

// Show login modal
loginBtn.onclick = function() {
    loginModal.style.display = "block";
}

// Show register modal
registerBtn.onclick = function() {
    registerModal.style.display = "block";
}

// Close modals when clicking (x)
Array.from(closeBtns).forEach(btn => {
    btn.onclick = function() {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
    }
});

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target == loginModal || event.target == registerModal) {
        loginModal.style.display = "none";
        registerModal.style.display = "none";
    }
}

// Handle form submissions
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Here you would typically send this data to a server
    console.log('Login attempt:', { email, password });
    alert('Login successful!');
    loginModal.style.display = "none";
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const passwords = this.querySelectorAll('input[type="password"]');
    
    if (passwords[0].value !== passwords[1].value) {
        alert('Passwords do not match!');
        return;
    }
    
    // Here you would typically send this data to a server
    console.log('Register attempt:', { name, email, password: passwords[0].value });
    alert('Registration successful!');
    registerModal.style.display = "none";
}); 