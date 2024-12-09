document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const viewCartButton = document.getElementById("viewCart");
    const closeModalButton = document.getElementById("closeModal");
    const checkoutButton = document.getElementById("checkout");
    const cartModal = document.getElementById("cartModal");
    const cartItemsList = document.getElementById("cartItems");

    // Load cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Save cart to local storage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Update cart UI
    function updateCartUI() {
        cartItemsList.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = `${item.name} (Size: ${item.size}) - $${item.price}`;
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                cart.splice(index, 1);
                saveCart();
                updateCartUI();
            });
            li.appendChild(removeButton);
            cartItemsList.appendChild(li);
        });
    }

    // Add to cart functionality
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const product = event.target.closest(".product");
            const id = product.dataset.id;
            const name = product.querySelector("h3").textContent;
            const price = product.querySelector("p").textContent.replace("$", "");
            const size = product.querySelector(".product-size").value;

            cart.push({ id, name, price, size });
            saveCart();
            alert(`${name} (Size: ${size}) added to cart!`);
        });
    });

    // Show cart modal
    viewCartButton.addEventListener("click", () => {
        updateCartUI();
        cartModal.classList.remove("hidden");
    });

    // Close cart modal
    closeModalButton.addEventListener("click", () => {
        alert("Your cart is cleared");
        cartModal.classList.add("hidden");
    });

    // Checkout functionality
    checkoutButton.addEventListener("click", () => {
        if (cart.length > 0) {
            alert("Thank you for purchasing!");
            cart = [];
            saveCart();
            updateCartUI();
            cartModal.classList.add("hidden");
        } else {
            alert("Your cart is empty!");
        }
    });
    

});
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    if (name && email && message) {
      alert("Thank you for reaching out! We will get back to you soon.");
      // Clear form fields
      document.getElementById("contactForm").reset();
    } else {
      alert("Please fill out all fields.");
    }
  });

  document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting
    const email = document.getElementById('email').value;
    
    if (email) {
        alert('Thank you for subscribing!');
        document.getElementById('subscribeForm').reset(); // Clear the input
    }
});