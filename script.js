document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('YOUR_EMAILJS_USER_ID'); // Replace with your EmailJS user ID

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
        {
            id: 3,
            name: "Bluetooth Speaker",
            price: 3500,
            image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1489&q=80",
            rating: 4,
            sold: 210,
            description: "Portable Bluetooth speaker with 12-hour battery life and waterproof design."
        },
        {
            id: 4,
            name: "Phone Stand",
            price: 1200,
            image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1367&q=80",
            rating: 3,
            sold: 340,
            description: "Adjustable phone stand compatible with all smartphones."
        },
        {
            id: 5,
            name: "Wireless Charger",
            price: 2500,
            image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1448&q=80",
            rating: 4,
            sold: 180,
            description: "Fast wireless charger compatible with Qi-enabled devices."
        },
        {
            id: 6,
            name: "Laptop Backpack",
            price: 3800,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
            rating: 5,
            sold: 95,
            description: "Durable laptop backpack with USB charging port and anti-theft design."
        }
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
                showOrderModal(product);
            });
        });

        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });

        // Make product cards clickable
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                // Don't navigate if a button was clicked
                if (e.target.tagName === 'BUTTON') return;
                
                const productId = parseInt(this.querySelector('.buy-now-btn').getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                showProductDetails(product);
            });
        });
    }

    // Show product details page (would need a separate HTML page in a real implementation)
    function showProductDetails(product) {
        // In a real app, this would navigate to a product details page
        // For this demo, we'll show the details in the order modal
        const detailsHtml = `
            <h2>${product.name}</h2>
            <img src="${product.image}" alt="${product.name}" style="max-width: 100%; margin: 15px 0;">
            <p><strong>Price:</strong> Rs. ${product.price.toFixed(2)}</p>
            <p><strong>Rating:</strong> ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</p>
            <p><strong>Sold:</strong> ${product.sold} units</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Delivery Charge:</strong> Rs. 400.00</p>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
                <button class="buy-now-btn" style="flex: 1;">Buy Now (Rs. ${(product.price + 400).toFixed(2)})</button>
                <button class="add-to-cart" style="flex: 1;">Add to Cart</button>
            </div>
        `;

        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = detailsHtml;
        
        // Add back button
        const backButton = document.createElement('span');
        backButton.className = 'close-btn';
        backButton.innerHTML = '&times;';
        backButton.style.cursor = 'pointer';
        backButton.addEventListener('click', () => {
            orderModal.style.display = 'none';
        });
        modalContent.insertBefore(backButton, modalContent.firstChild);
        
        // Add event listeners to buttons
        const buyNowBtn = modalContent.querySelector('.buy-now-btn');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', () => {
                showOrderModal(product);
            });
        }

        const addToCartBtn = modalContent.querySelector('.add-to-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                addToCart(product.id);
                orderModal.style.display = 'none';
            });
        }

        orderModal.style.display = 'block';
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
    function showOrderModal(product = null) {
        if (product) {
            // Single product order
            orderedItemsInput.value = JSON.stringify([{
                name: product.name,
                price: product.price,
                quantity: 1
            }]);
            orderedTotalInput.value = product.price + 400;
        } else {
            // Cart order
            const orderItems = cart.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
            
            orderedItemsInput.value = JSON.stringify(orderItems);
            orderedTotalInput.value = cart.reduce((total, item) => total + (item.price * item.quantity), 0) + 400;
        }
        
        orderModal.style.display = 'block';
    }

    // Close modal
    function closeOrderModal() {
        orderModal.style.display = 'none';
    }

    // Handle order form submission
    function handleOrderSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('customerName').value;
        const address = document.getElementById('customerAddress').value;
        const phone = document.getElementById('customerPhone').value;
        const email = document.getElementById('customerEmail').value;
        
        // Prepare email parameters
        const emailParams = {
            from_name: name,
            from_email: email || 'no-reply@lankaexpress.com',
            phone_number: phone,
            address: address,
            items: orderedItemsInput.value,
            total: orderedTotalInput.value
        };
        
        // Send email
        emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', emailParams)
            .then(() => {
                alert('Your order has been placed successfully! We will contact you shortly.');
                if (!document.getElementById('cartContainer')) {
                    // If not on cart page, clear the cart
                    cart = [];
                    updateCart();
                }
                closeOrderModal();
                orderForm.reset();
            }, (error) => {
                alert('There was an error submitting your order. Please try again or contact us directly.');
                console.error('EmailJS error:', error);
            });
    }

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

    // Hamburger menu toggle
    function toggleMenu() {
        navLinks.classList.toggle('active');
    }

    // Event listeners
    if (closeModal) closeModal.addEventListener('click', closeOrderModal);
    if (orderForm) orderForm.addEventListener('submit', handleOrderSubmit);
    if (checkoutBtn) checkoutBtn.addEventListener('click', showOrderModal);
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

    // Initialize the page
    updateCartCount();
    if (productsContainer) displayProducts();
    if (cartContainer) displayCartItems();
                });
