// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const phoneInput = document.getElementById('phoneInput');
const otpInput = document.getElementById('otpInput');
const cartItems = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');

// Cart state
let cart = [];
let isLoggedIn = false;

// Modal Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
    resetLoginForm();
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
        resetLoginForm();
    }
});

// OTP Functions
function sendOTP() {
    const phone = document.getElementById('phone').value;
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number');
        return;
    }

    // In a real application, this would make an API call to send OTP
    // For demo purposes, we'll use a fixed OTP: 123456
    alert('OTP sent! For demo purposes, use OTP: 123456');
    phoneInput.style.display = 'none';
    otpInput.style.display = 'block';
}

function verifyOTP() {
    const otp = document.getElementById('otp').value;
    const demoOTP = '123456';

    if (otp === demoOTP) {
        isLoggedIn = true;
        loginBtn.textContent = 'Logout';
        loginModal.style.display = 'none';
        resetLoginForm();
        alert('Login successful!');
    } else {
        alert('Invalid OTP. Please try again.');
    }
}

function resetLoginForm() {
    document.getElementById('phone').value = '';
    document.getElementById('otp').value = '';
    phoneInput.style.display = 'block';
    otpInput.style.display = 'none';
}

// Cart Functions
function addToCart(product, price) {
    if (!isLoggedIn) {
        alert('Please login to add items to cart');
        loginModal.style.display = 'block';
        return;
    }

    const existingItem = cart.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            product,
            price,
            quantity: 1
        });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.style.display = 'flex';
        itemElement.style.justifyContent = 'space-between';
        itemElement.style.alignItems = 'center';
        itemElement.style.marginBottom = '0.5rem';
        itemElement.style.padding = '0.5rem';
        itemElement.style.borderBottom = '1px solid #eee';

        itemElement.innerHTML = `
            <div>
                <span>${item.product}</span>
                <span style="margin-left: 1rem;">₹${item.price}/kg</span>
            </div>
            <div>
                <button onclick="updateQuantity(${index}, ${item.quantity - 1})" style="padding: 0.2rem 0.5rem;">-</button>
                <span style="margin: 0 0.5rem;">${item.quantity}</span>
                <button onclick="updateQuantity(${index}, ${item.quantity + 1})" style="padding: 0.2rem 0.5rem;">+</button>
                <button onclick="removeItem(${index})" style="margin-left: 1rem; color: red;">Remove</button>
            </div>
        `;

        cartItems.appendChild(itemElement);
    });

    totalAmount.textContent = total;
}

function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) {
        removeItem(index);
        return;
    }
    cart[index].quantity = newQuantity;
    updateCartDisplay();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function checkout() {
    if (!isLoggedIn) {
        alert('Please login to checkout');
        loginModal.style.display = 'block';
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // In a real application, this would proceed to a payment gateway
    alert('Order placed successfully! Thank you for your purchase.');
    cart = [];
    updateCartDisplay();
}

// Login/Logout toggle
loginBtn.addEventListener('click', () => {
    if (isLoggedIn) {
        isLoggedIn = false;
        loginBtn.textContent = 'Login';
        cart = [];
        updateCartDisplay();
    }
}); 