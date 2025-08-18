document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 4500,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            rating: 4,
            sold: 120,
            description: "High-quality wireless headphones with noise cancellation and 20-hour battery life."
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 8500,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
            rating: 5,
            sold: 85,
            description: "Feature-rich smartwatch with heart rate monitoring and GPS tracking."
        }, 
        {    id: 3,
            name: "Wireless Headphones",
            price: 4800,
            image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
            rating: 4.2,
            sold: 190,
            description: "High-quality wireless headphones with noise cancellation and 20-hour battery life."
        },
        {
            id: 4,
            name: "Smart Watch",
            price: 11500,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
            rating: 5,
            sold: 85,
            description: "Feature-rich smartwatch with heart rate monitoring and GPS tracking."
        },
        {
            id: 5,
            name: "Bluetooth Speaker",
            price: 3500,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1489&q=80",
            rating: 4,
            sold: 210,
            description: "Portable Bluetooth speaker with 12-hour battery life and waterproof design."
        },
        {
            id: 6,
            name: "Phone Stand",
            price: 1200,
            image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1367&q=80",
            rating: 3,
            sold: 340,
            description: "Adjustable phone stand compatible with all smartphones."
        },
        {
            id: 7,
            name: "Wireless Charger",
            price: 2500,
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80",
            rating: 4,
            sold: 180,
            description: "Fast wireless charger compatible with Qi-enabled devices."
        },
        {
            id: 8,
            name: "Laptop Backpack",
            price: 3800,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            rating: 5,
            sold: 95,
            description: "Durable laptop backpack with USB charging port and anti-theft design."
            }}
    ];

    // Cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    const productsContainer = document.getElementById('products-container');
    const cartContainer = document.getElementById('cartContainer');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartSummary = document.getElementById('cartSummary');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const orderModal = document.getElementById('orderModal');
    const closeModal = document.getElementById('closeModal');
    const orderForm = document.getElementById('orderForm');
    const orderedItemsInput = document.getElementById('orderedItems');
    const orderedTotalInput = document.getElementById('orderedTotal');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Update cart count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Display products on home page
    function displayProducts(productsToDisplay = products) {
        if (!productsContainer) return;

        productsContainer.innerHTML = '';
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">Rs. ${product.price.toFixed(2)}</div>
                    <div class="product-rating">
                        ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                    </div>
                    <button class="buy-now-btn" data-id="${product.id}">Buy Now</button>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });

        // Add event listeners to buttons
        document.querySelectorAll('.buy-now-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                showOrderModal([product]);
            });
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }

    // Add to cart function
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        updateCartCount();
        if (cartContainer) displayCartItems();
        
        // Show confirmation
        alert(`${product.name} has been added to your cart!`);
    }

    // Display cart items
    function displayCartItems() {
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartSummary.style.display = 'none';
            return;
        }

        cartEmpty.style.display = 'none';
        cartSummary.style.display = 'block';
        
        cartContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">Rs. ${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus" data-id="${item.id}">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                            <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <div class="remove-item" data-id="${item.id}">Remove</div>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Add event listeners to quantity controls
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                updateCartItemQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                updateCartItemQuantity(productId, 1);
            });
        });

        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const newQuantity = parseInt(this.value);
                
                if (newQuantity > 0) {
                    const item = cart.find(item => item.id === productId);
                    if (item) item.quantity = newQuantity;
                } else {
                    cart = cart.filter(item => item.id !== productId);
                }
                
                updateCart();
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                cart = cart.filter(item => item.id !== productId);
                updateCart();
            });
        });

        updateCartTotals();
    }

    // Update cart item quantity
    function updateCartItemQuantity(productId, change) {
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            
            if (item.quantity < 1) {
                cart = cart.filter(item => item.id !== productId);
            }
        }
        
        updateCart();
    }

    // Update cart and totals
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }

    // Update cart totals
    function updateCartTotals() {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const total = subtotal + 400; // Delivery charge
        
        subtotalElement.textContent = `Rs. ${subtotal.toFixed(2)}`;
        totalElement.textContent = `Rs. ${total.toFixed(2)}`;
    }

    // Show order modal
    function showOrderModal(products = null) {
        if (products) {
            // Single product order
            orderedItemsInput.value = JSON.stringify(products);
            orderedTotalInput.value = products.reduce((total, product) => total + product.price, 0) + 400;
        } else {
            // Cart order
            orderedItemsInput.value = JSON.stringify(cart);
            orderedTotalInput.value = cart.reduce((total, item) => total + (item.price * item.quantity), 0) + 400;
        }
        
        orderModal.style.display = 'block';
    }

    // Close modal
    function closeOrderModal() {
        orderModal.style.display = 'none';
    }

    // Handle order form submission (WhatsApp)
    function handleOrderSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('customerName').value;
        const address = document.getElementById('customerAddress').value;
        const phone = document.getElementById('customerPhone').value;
        
        const items = JSON.parse(orderedItemsInput.value);
        const total = orderedTotalInput.value;
        
        // Format order message
        let message = `New Order from LankaExpress\n\n`;
        message += `Customer: ${name}\n`;
        message += `Phone: ${phone}\n`;
        message += `Address: ${address}\n\n`;
        message += `Order Items:\n`;
        
        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - Rs.${item.price.toFixed(2)}`;
            if (item.quantity) message += ` (Qty: ${item.quantity})`;
            message += `\n`;
        });
        
        message += `\nSubtotal: Rs. ${(parseFloat(total) - 400).toFixed(2)}\n`;
        message += `Delivery Fee: Rs. 400.00\n`;
        message += `Total: Rs. ${parseFloat(total).toFixed(2)}\n\n`;
        message += `Please confirm this order.`;
        
        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message);
        
        // Open WhatsApp with the order details
        window.open(`https://wa.me/94741039941?text=${encodedMessage}`, '_blank');
        
        // Clear cart if not already on cart page
        if (!document.getElementById('cartContainer')) {
            cart = [];
            updateCart();
        }
        
        closeOrderModal();
        orderForm.reset();
    }

    // Hamburger menu toggle
    function toggleMenu() {
        navLinks.classList.toggle('active');
    }

    // Event listeners
    if (closeModal) closeModal.addEventListener('click', closeOrderModal);
    if (orderForm) orderForm.addEventListener('submit', handleOrderSubmit);
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => showOrderModal());
    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
    if (searchInput) searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') handleSearch();
    });
    if (hamburgerMenu) hamburgerMenu.addEventListener('click', toggleMenu);

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            closeOrderModal();
        }
    });

    // Search functionality
    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            displayProducts();
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
    }

    // Initialize the page
    updateCartCount();
    if (productsContainer) displayProducts();
    if (cartContainer) displayCartItems();
});
