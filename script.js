/* --- Product Data --- */
const products = [
    {
        id: 1,
        name: "Eternal Rose Bouquet",
        category: "flowers",
        price: 25.00,
        description: "A beautiful handmade bouquet of 5 eternal roses that never wilt.",
        image: "https://images.unsplash.com/photo-1621618684784-25e14fc8281f?auto=format&fit=crop&q=80&w=600",
        bestSeller: true
    },
    {
        id: 2,
        name: "Daisy Charm Keychain",
        category: "keychains",
        price: 8.50,
        description: "Cute and dainty daisy charm to brighten up your keys.",
        image: "https://images.unsplash.com/photo-1621618684232-40f4439c368d?auto=format&fit=crop&q=80&w=600",
        bestSeller: true
    },
    {
        id: 3,
        name: "Pastel Lavender Basket",
        category: "decor",
        price: 18.00,
        description: "Soft lavender storage basket for an aesthetic desk setup.",
        image: "https://images.unsplash.com/photo-1610444558055-613f17f461e7?auto=format&fit=crop&q=80&w=600",
        bestSeller: false
    },
    {
        id: 4,
        name: "Custom Initials Heart",
        category: "gifts",
        price: 12.00,
        description: "A personalized heart charm with your chosen initials.",
        image: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?auto=format&fit=crop&q=80&w=600",
        bestSeller: true
    },
    {
        id: 5,
        name: "Sunflower Stem",
        category: "flowers",
        price: 6.00,
        description: "A single cheerful sunflower stem for your favorite vase.",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=600",
        bestSeller: false
    },
    {
        id: 6,
        name: "Mini Cactus Plushie",
        category: "decor",
        price: 10.00,
        description: "Adorable mini cactus that requires zero watering.",
        image: "https://images.unsplash.com/photo-1610444558223-b67329598f39?auto=format&fit=crop&q=80&w=800",
        bestSeller: false
    }
];

/* --- State --- */
let cart = [];

/* --- Selectors --- */
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
const bestSellersContainer = document.getElementById('best-sellers-container');
const mainProductsGrid = document.getElementById('main-products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const backToTopBtn = document.getElementById('back-to-top');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalAmt = document.getElementById('cart-total-amt');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkout-btn');

/* --- Initialization --- */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, mainProductsGrid);
    renderProducts(products.filter(p => p.bestSeller), bestSellersContainer);
    initAccordions();
    initRevealAnimations();
});

/* --- Functions --- */

// Reveal Animations on Scroll
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .reveal').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Render Product Cards
function renderProducts(productsList, container) {
    if (!container) return;
    container.innerHTML = productsList.map(product => `
        <div class="product-card reveal" data-category="${product.category}">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-actions">
                    <button class="btn btn-secondary icon-btn" onclick="addToCart(${product.id})">
                        <i data-lucide="shopping-bag"></i> Add to Bag
                    </button>
                    <button class="btn btn-primary" onclick="buyNow(${product.id})">Buy Now</button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
            </div>
        </div>
    `).join('');
    lucide.createIcons();
}

// Filter Logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter products
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(p => p.category === filter);
        
        renderProducts(filteredProducts, mainProductsGrid);
    });
});

// Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCartSidebar();
}

function buyNow(productId) {
    const product = products.find(p => p.id === productId);
    const message = encodeURIComponent(`नमस्ते! I'd like to buy the ${product.name} (₹${product.price.toFixed(2)}).`);
    window.open(`https://wa.me/9373229256?text=${message}`, '_blank');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Update items list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your bag is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x ₹${item.price.toFixed(2)}</p>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Update total and count
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalAmt.innerText = `₹${total.toFixed(2)}`;
    
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = count;
}

function openCartSidebar() {
    cartSidebar.classList.add('open');
    cartOverlay.style.display = 'block';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.style.display = 'none';
}

// WhatsApp Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return alert('Your bag is empty!');
    
    let message = "नमस्ते! I'd like to place an order from The Knot House:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}): ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nTotal Amount: ₹${total.toFixed(2)}`;
    
    window.open(`https://wa.me/9373229256?text=${encodeURIComponent(message)}`, '_blank');
});

// UI Interactions
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    const isOpen = navLinks.classList.contains('active');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        lucide.createIcons();
    });
});

window.addEventListener('scroll', () => {
    // Sticky Nav
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    // Back to top
    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

cartBtn.addEventListener('click', openCartSidebar);
closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

function initAccordions() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close others
            items.forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

// Form Validations
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}
