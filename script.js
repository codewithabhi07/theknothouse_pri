/* --- Product Data (Inspired by The Knot House Branding) --- */
const products = [
    {
        id: 1,
        name: "Luxe Eternal Rose",
        category: "flowers",
        price: 499,
        description: "Hand-stitched premium roses that symbolize eternal love. A centerpiece that never wilts.",
        image: "https://images.unsplash.com/photo-1621618684784-25e14fc8281f?auto=format&fit=crop&q=80&w=800",
        bestSeller: true
    },
    {
        id: 2,
        name: "Cyber-Tulip Stem",
        category: "flowers",
        price: 199,
        description: "Minimalist aesthetic tulip stems. Perfect for desk vases or gifting.",
        image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800",
        bestSeller: true
    },
    {
        id: 3,
        name: "Stellar Daisy Keychain",
        category: "keychains",
        price: 149,
        description: "A pop of color for your keys or bags. Soft, durable, and uniquely handmade.",
        image: "https://images.unsplash.com/photo-1621618684232-40f4439c368d?auto=format&fit=crop&q=80&w=800",
        bestSeller: false
    },
    {
        id: 4,
        name: "Personalized Initial Heart",
        category: "gifts",
        price: 299,
        description: "A custom heart charm with your initials. The ultimate personalized gift.",
        image: "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?auto=format&fit=crop&q=80&w=800",
        bestSeller: true
    },
    {
        id: 5,
        name: "Midnight Lavender Basket",
        category: "decor",
        price: 899,
        description: "Artisan storage basket in a deep lavender hue. Practical yet incredibly aesthetic.",
        image: "https://images.unsplash.com/photo-1610444558055-613f17f461e7?auto=format&fit=crop&q=80&w=800",
        bestSeller: false
    },
    {
        id: 6,
        name: "Neon Cactus Amigurumi",
        category: "decor",
        price: 349,
        description: "The cutest desk companion. Zero maintenance, 100% aesthetic.",
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
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2.5)';
            cursor.style.border = '1px solid var(--accent-neon)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.border = 'none';
        });
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
                <p class="product-price">₹${product.price}</p>
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
    const message = encodeURIComponent(`Yoo! I'm obsessed with this "${name}" (₹${price}). Can I commission one for myself? ✨`);
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
        alert('Transmission received! We will get back to you soon.');
        contactForm.reset();
    });
}

const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Welcome to the Knot Family! Check your inbox soon.');
        newsletterForm.reset();
    });
}
