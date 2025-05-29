document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("proceed-to-checkout");

  // Helper: Retrieve cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Render cart items
  function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = ""; // Clear previous content
    let total = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cart.forEach((item, index) => {
        total += item.price;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width: 100px; height: auto;">
          <p>${item.name} - $${item.price}</p>
          <button class="btn remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
    }

    cartTotalElement.textContent = total.toFixed(2);
  }

  // Remove item from cart
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      const cart = getCart();
      cart.splice(index, 1); // Remove item
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart(); // Re-render cart
    }
  });

  // Proceed to checkout via WhatsApp
  checkoutButton.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty. Add some items before proceeding to checkout.");
      return;
    }

    let message = "Hello, I would like to place an order:\n\n";

    // Build the message with cart items
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - $${item.price}\n`;
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\nTotal Price: $${totalPrice}\n\nThank you!`;

    // WhatsApp URL
    const phoneNumber = "254115810222"; // Replace with your WhatsApp number in international format
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Redirect to WhatsApp
    window.open(whatsappURL, "_blank");
  });

  // Initial render
  renderCart();
});
