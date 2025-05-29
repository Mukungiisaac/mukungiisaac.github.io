document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartCountElement = document.getElementById("cart-count");

  // Helper: Retrieve cart from localStorage
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Helper: Save cart to localStorage
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Update cart count in the header
  function updateCartCount() {
    const cart = getCart();
    if (cartCountElement) {
      cartCountElement.textContent = cart.length;
    }
  }

  // Add item to the cart
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const product = e.target.closest(".category-card");
      const name = product.querySelector("p").textContent;
      const image = product.querySelector("img").src;
      const price = 1000; // Set default price or retrieve dynamically

      if (name && image) {
        const cart = getCart();
        cart.push({ name, image, price });
        saveCart(cart);
        updateCartCount();
        alert(`${name} has been added to your cart!`);
      }
    });
  });

  // Initialize cart count on page load
  updateCartCount();
});
