<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products - LankaExpress</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <!-- Same header as index.html -->
    </header>

    <main>
        <div class="products-container" id="productsContainer">
            <!-- Products will be loaded here -->
        </div>
    </main>

    <script type="module">
        import { initAuthUI, getCurrentUser } from './auth.js';
        
        // Initialize auth UI
        initAuthUI({
            loginLink: document.getElementById('loginLink'),
            registerLink: document.getElementById('registerLink'),
            logoutLink: document.getElementById('logoutLink'),
            userName: document.getElementById('userName'),
            profileLink: document.getElementById('profileLink')
        }, (user) => {
            // This callback runs when auth state changes
            const productsContainer = document.getElementById('productsContainer');
            
            if (user) {
                // User is logged in - load products
                productsContainer.innerHTML = `
                    <h2>Welcome to our products, ${user.displayName}!</h2>
                    <div class="product-list">
                        <!-- Products would be loaded here -->
                    </div>
                `;
            } else {
                // User is not logged in
                productsContainer.innerHTML = `
                    <div class="auth-required">
                        <h2>Please login to view products</h2>
                        <a href="login.html" class="auth-btn">Login Now</a>
                    </div>
                `;
            }
        });
    </script>
</body>
</html>
