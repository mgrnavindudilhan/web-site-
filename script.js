// Simple console log
console.log("My Shop loaded");

// Optional: Alert user when clicking "Buy via WhatsApp"
document.addEventListener("DOMContentLoaded", function() {
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(button => {
    button.addEventListener("click", function() {
      alert("You are being redirected to WhatsApp to complete your order.");
    });
  });
});

// Optional: Simple "Add to Cart" simulation
let cart = [];

function addToCart(productName) {
  cart.push(productName);
  alert(`${productName} added to cart!`);
  console.log("Current Cart:", cart);
}

// If you want to use addToCart, change HTML buy button like this:
// <a href="#" onclick="addToCart('Product 1');" class="buy-btn">Add to Cart</a>
