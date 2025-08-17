// භාණ්ඩ දත්ත
const products = [
    {
        id: 1,
        name: "ස්මාර්ට් ජංගම දුරකථනය",
        price: 25000,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
        rating: 4.5
    },
    {
        id: 2,
        name: "වයර්ලෙස් හෙඩ්ෆෝන්",
        price: 4500,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        rating: 4.2
    },
    {
        id: 3,
        name: "ස්මාර්ට් ඔරලෝසුව",
        price: 12000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80",
        rating: 4.7
    },
    {
        id: 4,
        name: "ලැප්ටොප් බෑග්",
        price: 3500,
        image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        rating: 3.9
    },
    {
        id: 5,
        name: "බ්ලූටූත් ස්පීකර්",
        price: 6000,
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1377&q=80",
        rating: 4.3
    },
    {
        id: 6,
        name: "පවර් බැංකුව",
        price: 8000,
        image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
        rating: 4.0
    }
];

// කරත්තය
let cart = [];

// DOM පූරණය වූ විට
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    
    // සෙවුම් බොත්තම් සිදුවීම
    document.querySelector('.search-bar button').addEventListener('click', searchProducts);
    document.querySelector('.search-bar input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
});

// භාණ්ඩ පෙන්වන්න
function displayProducts(filteredProducts = products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">රු.${product.price.toLocaleString()}</div>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                </div>
                <button class="add-to-cart" data-id="${product.id}">කරත්තයට එකතු කරන්න</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // කරත්ත බොත්තම් සිදුවීම්
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// තරු ජනනය කරන්න
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// කරත්තයට එකතු කරන්න
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    cart.push(product);
    updateCartCount();
    
    // තාවකාලික ඇලර්ට් පණිවිඩය
    const alertMsg = document.createElement('div');
    alertMsg.className = 'alert-message';
    alertMsg.textContent = `${product.name} කරත්තයට එකතු කරන ලදී!`;
    document.body.appendChild(alertMsg);
    
    setTimeout(() => {
        alertMsg.remove();
    }, 2000);
}

// කරත්ත ගණන යාවත්කාලීන කරන්න
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// භාණ්ඩ සොයන්න
function searchProducts() {
    const searchTerm = document.querySelector('.search-bar input').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// WhatsApp සමඟ සම්බන්ධ වීම
function connectViaWhatsApp(productName) {
    const phoneNumber = "94741039941";
    const message = `ආයුබෝවන්, මම ${productName} මිලදී ගැනීමට අවශ්‍යයි.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  }
