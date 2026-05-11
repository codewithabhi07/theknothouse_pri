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

/* --- Selectors --- */
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
const bestSellersContainer = document.getElementById('best-sellers-container');
const mainProductsGrid = document.getElementById('main-products-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const backToTopBtn = document.getElementById('back-to-top');
const cursor = document.getElementById('cursor');

/* --- Initialization --- */
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products, mainProductsGrid);
    renderProducts(products.filter(p => p.bestSeller), bestSellersContainer);
    initAccordions();
    initRevealAnimations();
    initCustomCursor();
    initMagneticButtons();
});

/* --- Functions --- */

// Custom Cursor
function initCustomCursor() {
    if (!cursor) return;
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .product-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
        el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const magnets = document.querySelectorAll('.magnet');
    magnets.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const position = btn.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseout', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Reveal Animations on Scroll
function initRevealAnimations() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
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
                    <button class="btn btn-primary w-100" onclick="inquireProduct('${product.name}', ${product.price})">
                        <i data-lucide="message-circle"></i> Inquire
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-details">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-name">${product.name}</h3>
                </div>
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
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);
        renderProducts(filteredProducts, mainProductsGrid);
    });
});

// WhatsApp Inquiry
function inquireProduct(name, price) {
    const message = encodeURIComponent(`नमस्ते! I'm interested in the "${name}" (₹${price.toFixed(2)}). Can you share more details?`);
    window.open(`https://wa.me/9373229256?text=${message}`, '_blank');
}

// UI Interactions
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    const isOpen = navLinks.classList.contains('active');
    icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        lucide.createIcons();
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }

    if (window.scrollY > 500) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function initAccordions() {
    const items = document.querySelectorAll('.accordion-item');
    items.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
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
