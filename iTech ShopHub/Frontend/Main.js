// DOM Elements
const searchBar = document.querySelector('.search-bar');
const dealsGrid = document.querySelector('.deals-grid');
const cartCountElement = document.getElementById('cart-count');

// Sample data for featured deals
const deals = [
  {
    image: "https://img.freepik.com/free-photo/people-connected-social-media_23-2149160253.jpg?ga=GA1.1.371648439.1731572472&semt=ais_hybrid",
    description: "Up to 30% off on Smartphones"
  },
  {
    image: "https://img.freepik.com/free-photo/close-up-portrait-happy-smiling-romantic-tender-african-american-woman-enjoying-listening-music-headphones-tilt-head-close-eyes-dreamy-grinning-delighted-blue-wall_1258-35460.jpg?ga=GA1.1.371648439.1731572472&semt=ais_hybrid",
    description: "Take Your Sound Anywhere"
  },
  {
    image: "https://img.freepik.com/free-photo/view-electronic-product-balancing-podium_23-2150141335.jpg?ga=GA1.1.371648439.1731572472&semt=ais_hybrid",
    description: "Exclusive Offers on Laptops"
  }
];

// Helper: Retrieve cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Helper: Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count in the header
function updateCartCount() {
  const cart = getCart();
  cartCountElement.textContent = cart.length; // Update cart count dynamically
}

// Function to load deals dynamically
function loadDeals() {
  dealsGrid.innerHTML = ''; // Clear existing content
  deals.forEach((deal, index) => {
    const dealItem = document.createElement('div');
    dealItem.classList.add('deal-item');
    dealItem.innerHTML = `
      <img src="${deal.image}" alt="${deal.description}">
      <p>${deal.description}</p>
      <button class="btn add-to-cart-btn" data-index="${index}">Add to Cart</button>
    `;
    dealsGrid.appendChild(dealItem);
  });

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productIndex = e.target.getAttribute('data-index');
      const product = deals[productIndex];

      // Add the product to the cart
      const cart = getCart();
      cart.push(product);
      saveCart(cart);

      // Update the cart count immediately
      updateCartCount();
      alert(`${product.description} has been added to your cart!`);
    });
  });
}

// Function to filter deals based on search input
searchBar.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredDeals = deals.filter(deal =>
    deal.description.toLowerCase().includes(searchText)
  );

  // Update deals grid with filtered results
  dealsGrid.innerHTML = '';
  filteredDeals.forEach((deal, index) => {
    const dealItem = document.createElement('div');
    dealItem.classList.add('deal-item');
    dealItem.innerHTML = `
      <img src="${deal.image}" alt="${deal.description}">
      <p>${deal.description}</p>
      <button class="btn add-to-cart-btn" data-index="${index}">Add to Cart</button>
    `;
    dealsGrid.appendChild(dealItem);
  });

  // Reattach event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const productIndex = e.target.getAttribute('data-index');
      const product = deals[productIndex];

      // Add the product to the cart
      const cart = getCart();
      cart.push(product);
      saveCart(cart);

      // Update the cart count immediately
      updateCartCount();
      alert(`${product.description} has been added to your cart!`);
    });
  });
});

// Add button hover and click animations
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.1)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });

  button.addEventListener('click', () => {
    button.style.backgroundColor = '#005f9e';
    setTimeout(() => {
      button.style.backgroundColor = '';
    }, 300);
  });
});

// Load deals on page load
document.addEventListener('DOMContentLoaded', () => {
  loadDeals();
  updateCartCount(); // Initialize cart count on page load
});
