// JavaScript for simple button clicks and interactions
document.addEventListener("DOMContentLoaded", () => {
    const shopButton = document.querySelector("#shop-button");

    if (shopButton) {
        shopButton.addEventListener("click", () => {
            alert("Redirecting to Shop!");
        });
    }});


    let cart = [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.dataset.item;
            const price = parseFloat(button.dataset.price);
            const id = button.dataset.id;
            const sizeSelect = document.getElementById(size-select-${id});
            const size = sizeSelect ? sizeSelect.value : 'N/A';
    
            // Add item to the cart
            const cartItem = { item, price, size };
            cart.push(cartItem);
            updateCartUI();
        });
    });
    
    function updateCartUI() {
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
    
        cartItems.innerHTML = '';
        let total = 0;
    
        cart.forEach((cartItem, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${cartItem.item} - $${cartItem.price} <br> Size: ${cartItem.size}
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItems.appendChild(li);
            total += cartItem.price;
        });
    
        cartCount.textContent = cart.length;
        cartTotal.textContent = Subtotal: $${total.toFixed(2)};
        cartSidebar.style.display = cart.length > 0 ? 'block' : 'none';
    }
    
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }