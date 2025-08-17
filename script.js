// EmailJS ආරම්භක කිරීම
emailjs.init('YOUR_EMAILJS_USER_ID');

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
    }
];

// කරත්තය
let cart = [];
let currentProduct = null;

// DOM පූරණය වූ විට
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
    
    // සෙවුම් බොත්තම් සිදුවීම
    document.getElementById('searchBtn').addEventListener('click', searchProducts);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
    
    // මොඩල් වසන්න බොත්තම
    document.getElementById('closeModal').addEventListener('click', closeModal);
    
    // ඇණවුම් පෝරමය ඉදිරිපත් කිරීම
    document.getElementById('orderForm').addEventListener('submit', submitOrderForm);
    
    // මොඩල් පිටුවෙන් පිටත ක්ලික් කළ විට වසන්න
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('orderModal');
        if (event.target === modal) {
            closeModal();
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
                <button class="buy-now-btn" data-id="${product.id}">Buy Now</button>
                <button class="add-to-cart" data-id="${product.id}">කරත්තයට එකතු කරන්න</button>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Buy Now බොත්තම් සිදුවීම්
    document.querySelectorAll('.buy-now-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            currentProduct = products.find(p => p.id === productId);
            openModal(currentProduct);
        });
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
    showAlert(`${product.name} කරත්තයට එකතු කරන ලදී!`);
}

// කරත්ත ගණන යාවත්කාලීන කරන්න
function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

// භාණ්ඩ සොයන්න
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
}

// මොඩල් විවෘත කරන්න
function openModal(product) {
    document.getElementById('orderedProduct').value = product.name;
    document.getElementById('orderedPrice').value = `රු.${product.price.toLocaleString()}`;
    document.getElementById('orderModal').style.display = 'block';
}

// මොඩල් වසන්න
function closeModal() {
    document.getElementById('orderModal').style.display = 'none';
    document.getElementById('orderForm').reset();
}

// ඇණවුම් පෝරමය ඉදිරිපත් කිරීම
function submitOrderForm(e) {
    e.preventDefault();
    
    // පෝරම දත්ත ලබා ගැනීම
    const formData = {
        name: document.getElementById('customerName').value.trim(),
        address: document.getElementById('customerAddress').value.trim(),
        phone: document.getElementById('customerPhone').value.trim(),
        email: document.getElementById('customerEmail').value.trim(),
        product: document.getElementById('orderedProduct').value,
        price: document.getElementById('orderedPrice').value,
        timestamp: new Date().toLocaleString('si-LK')
    };
    
    // දත්ත වලංගු කිරීම
    if (!formData.name || !formData.address || !formData.phone) {
        showAlert("කරුණාකර අනිවාර්ය ක්ෂේත්‍ර පුරවන්න!");
        return;
    }
    
    // WhatsApp පණිවිඩය යැවීම
    sendWhatsAppMessage(formData);
    
    // ඊමේල් යැවීම
    sendEmail(formData);
    
    // පෝරමය යළි පිහිටුවීම සහ මොඩල් වසන්න
    closeModal();
    
    // සාර්ථක පණිවිඩය පෙන්වන්න
    showAlert("ඇණවුම සාර්ථකව ලබාගෙන ඇත! ඔබගේ WhatsApp අංකයට තහවුරු කිරීම් පණිවිඩයක් යවනු ලැබේ.");
}

// WhatsApp පණිවිඩය යැවීම
function sendWhatsAppMessage(formData) {
    const phoneNumber = "94741039941";
    const message = `නව ඇණවුම!
        
නම: ${formData.name}
දුරකථන: ${formData.phone}
ලිපිනය: ${formData.address}
${formData.email ? `විද්‍යුත් තැපෑල: ${formData.email}` : ''}

භාණ්ඩය: ${formData.product}
මිල: ${formData.price}

කාලය: ${formData.timestamp}`;
    
    const whatsappUrl = `https://wa.me/${+94741039941}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ඊමේල් යැවීම
function sendEmail(formData) {
    const templateParams = {
        to_email: "mgrnavindudilhan@gmail.com",
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_address: formData.address,
        customer_email: formData.email || 'නොමැත',
        product_name: formData.product,
        product_price: formData.price,
        order_time: formData.timestamp
    };
    
    emailjs.send('YOUR_EMAILJS_SERVICE_ID', 'YOUR_EMAILJS_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('Email sent successfully!', response);
        }, function(error) {
            console.log('Email failed to send:', error);
        });
}

// ඇලර්ට් පණිවිඩය පෙන්වන්න
function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-message';
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}
