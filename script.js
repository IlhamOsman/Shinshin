document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("navigation-menu");

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

        // Toggle the aria-expanded attribute
        menuToggle.setAttribute("aria-expanded", !isExpanded);

        // Toggle visibility of the navigation menu
        navMenu.classList.toggle("hidden");
        navMenu.classList.toggle("visible");
    });
});
document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    const email = document.getElementById('email').value;
    
    if (email) {
        alert('Thank you for subscribing!');
        document.getElementById('subscribeForm').reset(); // Clear the input
    }
});


let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart UI
function updateCartUI() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((cartItem, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${cartItem.item} - $${cartItem.price} <br> Size: ${cartItem.size}`;
        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.addEventListener('click', () => removeFromCart(index));
        li.appendChild(button);
        cartItems.appendChild(li);
        total += cartItem.price;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = `Subtotal: $${total.toFixed(2)}`;
    cartSidebar.style.display = cart.length > 0 ? 'block' : 'none';
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.getAttribute('data-item');
        const price = parseFloat(button.getAttribute('data-price'));
        const id = button.getAttribute('data-id');
        const sizeSelect = document.getElementById(`size-select-${id}`);
        const size = sizeSelect.value;

        cart.push({ item, price, size });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    });
});

// Checkout Button Click
document.getElementById('checkout-btn').addEventListener('click', () => {
    const modal = document.getElementById('summary-modal');
    const modalCartItems = document.getElementById('modal-cart-items');
    const modalCartTotal = document.getElementById('modal-cart-total');

    modalCartItems.innerHTML = '';
    let total = 0;

    cart.forEach(cartItem => {
        const li = document.createElement('li');
        li.innerHTML = `${cartItem.item} - $${cartItem.price} <br> Size: ${cartItem.size}`;
        modalCartItems.appendChild(li);
        total += cartItem.price;
    });

    modalCartTotal.textContent = `Subtotal: $${total.toFixed(2)}`;
    modal.style.display = 'flex';
});

// Modal Confirm Order
document.getElementById('confirm-order').addEventListener('click', () => {
    alert('Thank you for your purchase!');
    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
    document.getElementById('summary-modal').style.display = 'none';
});

// Modal Close
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('summary-modal').style.display = 'none';
});

// Initialize Cart UI
updateCartUI();

