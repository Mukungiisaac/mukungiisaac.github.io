// DOM Elements
const searchBar = document.querySelector('.search-bar');
const dealsGrid = document.querySelector('.deals-grid');
const allProducts = document.querySelectorAll(".category-card");

// Function to find and scroll to product
function scrollToProduct(searchText) {
  let foundProduct = null;

  allProducts.forEach((product) => {
    const productName = product.querySelector("p").textContent.toLowerCase();
    
    if (productName.includes(searchText)) {
      foundProduct = product;
    }
  });

  if (foundProduct) {
    foundProduct.scrollIntoView({ behavior: "smooth", block: "center" });
    highlightProduct(foundProduct);
  } else {
    alert("Product not found. Try searching again.");
  }
}

// Function to highlight the product temporarily
function highlightProduct(product) {
  product.style.outline = "3px solid red";
  setTimeout(() => {
    product.style.outline = "none";
  }, 2000);
}

// Function to filter and display deals
function filterDeals(searchText) {
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
  attachCartListeners();
}

// Function to attach event listeners to "Add to Cart" buttons
function attachCartListeners() {
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

// Event listener for input (live search)
searchBar.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  filterDeals(searchText);
});

// Event listener for Enter key press
searchBar.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const searchText = searchBar.value.toLowerCase().trim();
    if (searchText) {
      scrollToProduct(searchText);
    } else {
      alert("Please enter a search term.");
    }
  }
});

// Load deals on page load
document.addEventListener('DOMContentLoaded', () => {
  loadDeals();
  updateCartCount();
});
