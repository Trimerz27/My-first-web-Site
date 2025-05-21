// Cart functionality
let cart = [];

// Add sample items (in a real app, these would come from a database)
const sampleItems = [
  { id: 1, name: 'Small Soil Pack', price: 9.99, quantity: 2 },
  { id: 2, name: 'Medium Plant', price: 24.99, quantity: 1 },
  { id: 3, name: 'Large Tree', price: 149.99, quantity: 1 }
];

// Initialize cart with sample items
cart = [...sampleItems];

// Function to update cart display
function updateCartDisplay() {
  const cartItems = document.getElementById('cartItems');
  const totalItems = document.getElementById('totalItems');
  const totalAmount = document.getElementById('totalAmount');
  
  // Clear current display
  cartItems.innerHTML = '';
  
  // Add each item to the display
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: $${item.price}</p>
        <div class="quantity-controls">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
        </div>
      </div>
      <div class="item-total">
        <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="removeItem(${item.id})" class="remove-btn">Remove</button>
      </div>
    `;
    cartItems.appendChild(itemElement);
  });
  
  // Update summary
  totalItems.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  totalAmount.textContent = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
}

// Function to update item quantity
function updateQuantity(itemId, newQuantity) {
  if (newQuantity < 1) return;
  
  const itemIndex = cart.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity = newQuantity;
    updateCartDisplay();
  }
}

// Function to remove item from cart
function removeItem(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartDisplay();
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);