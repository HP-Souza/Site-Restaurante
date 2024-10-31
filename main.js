// Load cart from localStorage or initialize it as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save the cart to localStorage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to add an item to the cart
const addToCart = (itemName, itemPrice) => {
    const item = { name: itemName, price: parseFloat(itemPrice) }; // Ensure price is a number
    cart.push(item);
    saveCart();
    updateCartCount();
};

// Function to update the cart count displayed in the navigation
const updateCartCount = () => {
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cart.length; // Update the cart count
};

// Function to calculate total price
const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
};

// Function to display cart contents
const displayCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceDiv = document.getElementById('total-price');

    cartItemsContainer.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(itemDiv);
        totalPrice += item.price; // Add to total price
    });

    totalPriceDiv.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
};

// Checkout function
const checkout = () => {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let checkoutMessage = "Itens no seu carrinho:\n";
    cart.forEach((item, index) => {
        checkoutMessage += `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });

    const total = calculateTotal();
    checkoutMessage += `\nTotal: R$ ${total}`;
    alert(checkoutMessage);

    // Clear the cart after checkout
    cart = [];
    saveCart();
    updateCartCount();
    displayCartItems();
};

// Toggle cart visibility
document.getElementById('cart-toggle').addEventListener('click', () => {
    const cartPopup = document.getElementById('cart-popup');
    cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
    displayCartItems(); // Update display when toggling
});

// Close cart functionality
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-popup').style.display = 'none';
});

// Checkout button functionality
document.getElementById('checkout-button').addEventListener('click', checkout);

// Initial update of cart count and display
const initCart = () => {
    updateCartCount();
    displayCartItems();
};

// Load cart on page load
document.addEventListener('DOMContentLoaded', initCart);