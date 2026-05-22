// script.js - FoodieBudget Functional JavaScript

// ========================
// DATA MODULE
// ========================
const mealDatabase = [
    { id: 1, name: "Nyama Choma + Ugali", category: "Dinner", price: 350, rating: 4.8, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop", description: "Tender grilled meat with ugali and kachumbari" },
    { id: 2, name: "Chips + Chicken", category: "Lunch", price: 250, rating: 4.5, image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=400&h=300&fit=crop", description: "Crispy fries with juicy fried chicken" },
    { id: 3, name: "Pilau Beef", category: "Dinner", price: 280, rating: 4.7, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", description: "Aromatic spiced rice with tender beef" },
    { id: 4, name: "Mahamri + Chai", category: "Breakfast", price: 70, rating: 4.3, image: "https://images.unsplash.com/photo-1596097635122-14a9c3e0a3d5?w=400&h=300&fit=crop", description: "Sweet fried bread with strong Kenyan tea" },
    { id: 5, name: "Githeri", category: "Lunch", price: 120, rating: 4.2, image: "https://images.unsplash.com/photo-1615127028740-24722b644c7f?w=400&h=300&fit=crop", description: "Hearty corn and bean stew" },
    { id: 6, name: "Samosa (2pcs)", category: "Snacks", price: 80, rating: 4.6, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop", description: "Crispy pastry filled with spiced meat" },
    { id: 7, name: "Omena (Silver Fish)", category: "Dinner", price: 200, rating: 4.4, image: "https://images.unsplash.com/photo-1573674802829-2eeabc2ff22c?w=400&h=300&fit=crop", description: "Traditional dried silver fish with onions" },
    { id: 8, name: "Chapati + Beans", category: "Lunch", price: 150, rating: 4.5, image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=400&h=300&fit=crop", description: "Soft chapatis with bean curry" },
    { id: 9, name: "Matoke (Plantain)", category: "Dinner", price: 180, rating: 4.3, image: "https://images.unsplash.com/photo-1592331396305-b6ab5d8e1b6f?w=400&h=300&fit=crop", description: "Steamed green bananas with meat" },
    { id: 10, name: "Mandazi (5pcs)", category: "Breakfast", price: 100, rating: 4.7, image: "https://images.unsplash.com/photo-1614701192807-26d2e12e1029?w=400&h=300&fit=crop", description: "Sweet coconut-flavored doughnuts" },
    { id: 11, name: "Fruit Smoothie", category: "Drinks", price: 150, rating: 4.5, image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", description: "Fresh blended seasonal fruits" },
    { id: 12, name: "Mukimo", category: "Lunch", price: 130, rating: 4.2, image: "https://images.unsplash.com/photo-1596097635122-14a9c3e0a3d5?w=400&h=300&fit=crop", description: "Mashed potatoes with greens and maize" },
    { id: 13, name: "Kebab + Chapati", category: "Snacks", price: 180, rating: 4.6, image: "https://images.unsplash.com/photo-1596097635122-14a9c3e0a3d5?w=400&h=300&fit=crop", description: "Grilled meat skewers with chapati" },
    { id: 14, name: "Mango Juice Fresh", category: "Drinks", price: 100, rating: 4.4, image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop", description: "Freshly squeezed mango juice" },
    { id: 15, name: "Rice + Beef Stew", category: "Lunch", price: 300, rating: 4.7, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop", description: "Fragrant rice with rich beef stew" }
];

// Deals data (featured items)
const dealsData = mealDatabase.slice(0, 6);

// ========================
// STATE MODULE
// ========================
const AppState = {
    currentBudget: 500,
    currentCategory: "All",
    currentSort: "default",
    searchQuery: "",
    filteredMeals: [...mealDatabase],
    theme: "light"
};

// ========================
// DOM ELEMENTS
// ========================
const DOM = {
    budgetInput: document.getElementById('budget-input'),
    categorySelect: document.getElementById('category-select'),
    suggestBtn: document.getElementById('suggest-btn'),
    searchBar: document.getElementById('search-bar'),
    sortSelect: document.getElementById('sort-select'),
    foodGrid: document.getElementById('food-grid'),
    emptyState: document.getElementById('empty-state'),
    loadingSpinner: document.getElementById('loading-spinner'),
    dealsContainer: document.getElementById('deals-container'),
    themeToggle: document.getElementById('theme-toggle'),
    whatsappForm: document.getElementById('whatsapp-form'),
    waName: document.getElementById('wa-name'),
    waMeal: document.getElementById('wa-meal'),
    waLocation: document.getElementById('wa-location')
};

// ========================
// HELPER FUNCTIONS
// ========================
const showLoading = () => {
    DOM.loadingSpinner.classList.remove('hidden');
    DOM.foodGrid.classList.add('hidden');
    DOM.emptyState.classList.add('hidden');
};

const hideLoading = () => {
    DOM.loadingSpinner.classList.add('hidden');
    DOM.foodGrid.classList.remove('hidden');
};

const showEmptyState = () => {
    DOM.foodGrid.classList.add('hidden');
    DOM.emptyState.classList.remove('hidden');
};

const hideEmptyState = () => {
    DOM.emptyState.classList.add('hidden');
    DOM.foodGrid.classList.remove('hidden');
};

// Filter meals based on budget, category, and search
const filterMeals = () => {
    let meals = [...mealDatabase];
    
    // Filter by budget
    meals = meals.filter(meal => meal.price <= AppState.currentBudget);
    
    // Filter by category
    if (AppState.currentCategory !== "All") {
        meals = meals.filter(meal => meal.category === AppState.currentCategory);
    }
    
    // Filter by search query
    if (AppState.searchQuery.trim() !== "") {
        const query = AppState.searchQuery.toLowerCase();
        meals = meals.filter(meal => meal.name.toLowerCase().includes(query));
    }
    
    return meals;
};

// Sort meals based on current sort option
const sortMeals = (meals) => {
    const sorted = [...meals];
    
    switch (AppState.currentSort) {
        case "low":
            return sorted.sort((a, b) => a.price - b.price);
        case "high":
            return sorted.sort((a, b) => b.price - a.price);
        case "rating":
            return sorted.sort((a, b) => b.rating - a.rating);
        default:
            return sorted;
    }
};

// Create food card HTML
const createFoodCard = (meal) => {
    return `
        <div class="food-card" data-id="${meal.id}">
            <img class="food-img" src="${meal.image}" alt="${meal.name}" loading="lazy">
            <div class="food-info">
                <h3>${meal.name}</h3>
                <p>${meal.description}</p>
                <div class="food-price">KES ${meal.price}</div>
                <div class="rating">⭐ ${meal.rating}</div>
                <button class="order-btn" data-name="${meal.name}" data-price="${meal.price}">
                    <i class="fas fa-shopping-cart"></i> Order Now
                </button>
            </div>
        </div>
    `;
};

// Render meals to grid
const renderMeals = () => {
    const filtered = filterMeals();
    const sorted = sortMeals(filtered);
    AppState.filteredMeals = sorted;
    
    if (sorted.length === 0) {
        showEmptyState();
        DOM.foodGrid.innerHTML = '';
    } else {
        hideEmptyState();
        DOM.foodGrid.innerHTML = sorted.map(createFoodCard).join('');
        
        // Attach order button event listeners
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const mealName = btn.getAttribute('data-name');
                const mealPrice = btn.getAttribute('data-price');
                populateWhatsAppForm(mealName, mealPrice);
            });
        });
    }
};

// Populate WhatsApp form with meal details
const populateWhatsAppForm = (mealName, mealPrice) => {
    if (DOM.waMeal) {
        DOM.waMeal.value = `${mealName} (KES ${mealPrice})`;
    }
    // Smooth scroll to WhatsApp section
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
};

// Render deals section (horizontal scroll)
const renderDeals = () => {
    if (!DOM.dealsContainer) return;
    
    DOM.dealsContainer.innerHTML = dealsData.map(deal => `
        <div class="food-card" style="min-width: 260px;">
            <img class="food-img" src="${deal.image}" alt="${deal.name}" style="height: 160px;">
            <div class="food-info">
                <h4>${deal.name}</h4>
                <div class="food-price">KES ${deal.price}</div>
                <div class="rating">⭐ ${deal.rating}</div>
                <button class="order-btn small" data-name="${deal.name}" data-price="${deal.price}">
                    <i class="fab fa-whatsapp"></i> Order
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to deal buttons
    document.querySelectorAll('#deals-container .order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mealName = btn.getAttribute('data-name');
            const mealPrice = btn.getAttribute('data-price');
            populateWhatsAppForm(mealName, mealPrice);
        });
    });
};

// Update the UI based on current state
const updateUI = () => {
    showLoading();
    // Simulate async loading for smooth UX
    setTimeout(() => {
        renderMeals();
        hideLoading();
    }, 300);
};

// ========================
// EVENT HANDLERS
// ========================
const handleSuggestMeal = () => {
    // Get budget value
    const budget = parseInt(DOM.budgetInput.value);
    if (isNaN(budget) || budget <= 0) {
        alert("Please enter a valid budget amount (KES)");
        return;
    }
    
    AppState.currentBudget = budget;
    AppState.currentCategory = DOM.categorySelect.value;
    
    updateUI();
};

const handleSearch = () => {
    AppState.searchQuery = DOM.searchBar.value;
    updateUI();
};

const handleSort = () => {
    AppState.currentSort = DOM.sortSelect.value;
    updateUI();
};

// Debounce search input
const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

// Theme toggle functionality
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        AppState.theme = 'light';
        localStorage.setItem('foodie-theme', 'light');
        DOM.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        AppState.theme = 'dark';
        localStorage.setItem('foodie-theme', 'dark');
        DOM.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
};

// Load saved theme
const loadTheme = () => {
    const savedTheme = localStorage.getItem('foodie-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        AppState.theme = 'dark';
        if (DOM.themeToggle) DOM.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        AppState.theme = 'light';
        if (DOM.themeToggle) DOM.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
};

// WhatsApp form submission
const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    const name = DOM.waName?.value.trim();
    const meal = DOM.waMeal?.value.trim();
    const location = DOM.waLocation?.value.trim();
    
    if (!name || !meal || !location) {
        alert("Please fill in all fields to place your order");
        return;
    }
    
    // Format WhatsApp message
    const message = `🍽️ *New Order from FoodieBudget* 🍽️%0A%0A*Customer:* ${name}%0A*Meal:* ${meal}%0A*Location:* ${location}%0A*Platform:* FoodieBudget Web App%0A%0A_This is an automated order request. Please respond to confirm._`;
    
    const phoneNumber = "254700000000"; // Default Kenya number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert(`✅ Order placed! You'll be redirected to WhatsApp to complete your order for ${meal}`);
    
    // Optional: Clear form
    // DOM.waName.value = '';
    // DOM.waMeal.value = '';
    // DOM.waLocation.value = '';
};

// Mobile menu toggle
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
};

// Add CSS for mobile menu if not in style
const addMobileMenuStyles = () => {
    if (!document.querySelector('#mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
            @media (max-width: 768px) {
                .nav-links {
                    position: fixed;
                    top: 70px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 70px);
                    background: var(--card-bg);
                    flex-direction: column;
                    align-items: center;
                    padding: 40px;
                    transition: 0.3s ease;
                    z-index: 999;
                }
                .nav-links.active {
                    left: 0;
                }
                .menu-toggle {
                    display: block !important;
                    cursor: pointer;
                }
                .nav-actions .menu-toggle {
                    display: block;
                }
                .nav-actions {
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }
            }
            @media (min-width: 769px) {
                .menu-toggle {
                    display: none !important;
                }
            }
            .small {
                padding: 8px;
                font-size: 0.85rem;
            }
            .rating {
                font-size: 0.85rem;
                color: #f39c12;
                margin: 5px 0;
            }
        `;
        document.head.appendChild(style);
    }
};

// Smooth scroll for anchor links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const menuToggle = document.querySelector('.menu-toggle');
                    if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
};

// Initialize event listeners
const initEventListeners = () => {
    if (DOM.suggestBtn) {
        DOM.suggestBtn.addEventListener('click', handleSuggestMeal);
    }
    
    if (DOM.searchBar) {
        DOM.searchBar.addEventListener('input', debounce(handleSearch, 300));
    }
    
    if (DOM.sortSelect) {
        DOM.sortSelect.addEventListener('change', handleSort);
    }
    
    if (DOM.themeToggle) {
        DOM.themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (DOM.whatsappForm) {
        DOM.whatsappForm.addEventListener('submit', handleWhatsAppSubmit);
    }
    
    // Enter key on budget input triggers search
    if (DOM.budgetInput) {
        DOM.budgetInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSuggestMeal();
        });
    }
};

// Set default budget placeholder value
const setDefaultBudget = () => {
    if (DOM.budgetInput) {
        DOM.budgetInput.value = "300";
        AppState.currentBudget = 300;
    }
};

// ========================
// INITIALIZATION
// ========================
const init = () => {
    console.log("FoodieBudget App Initialized 🍽️");
    
    setDefaultBudget();
    loadTheme();
    renderDeals();
    updateUI();
    initEventListeners();
    initMobileMenu();
    addMobileMenuStyles();
    initSmoothScroll();
};

// ========================
// TESTIMONIALS MODULE WITH WHATSAPP INTEGRATION
// ========================

// Testimonials Database
const testimonialsDatabase = [
    {
        id: 1,
        name: "Brian Kipchoge",
        location: "Nairobi, CBD",
        rating: 5,
        comment: "This app helps me choose meals daily! Perfect for campus students. I've saved over 2000 KES this month alone.",
        favoriteMeal: "Nyama Choma",
        date: "2024-01-15",
        phone: "0712345678"
    },
    {
        id: 2,
        name: "Stacy Wanjiku",
        location: "Westlands",
        rating: 5,
        comment: "Amazing food suggestions! I never knew I could get Pilau for that cheap. The WhatsApp order feature is a game-changer!",
        favoriteMeal: "Pilau Beef",
        date: "2024-01-10",
        phone: "0723456789"
    },
    {
        id: 3,
        name: "James Otieno",
        location: "Kilimani",
        rating: 5,
        comment: "Finally an app that understands Kenyan pockets. The deals section saves me everyday. Highly recommended!",
        favoriteMeal: "Chips Chicken",
        date: "2024-01-05",
        phone: null
    },
    {
        id: 4,
        name: "Mary Njeri",
        location: "Eastlands",
        rating: 5,
        comment: "As a mom of two, budgeting meals is crucial. FoodieBudget helps me plan weekly meals without breaking the bank.",
        favoriteMeal: "Githeri",
        date: "2024-01-03",
        phone: "0734567890"
    },
    {
        id: 5,
        name: "Peter Mwangi",
        location: "Thika Road",
        rating: 4,
        comment: "Great variety of meals and very accurate budget suggestions. The UI is beautiful and easy to use.",
        favoriteMeal: "Chapati Beans",
        date: "2023-12-28",
        phone: null
    },
    {
        id: 6,
        name: "Sarah Chemutai",
        location: "Eldoret",
        rating: 5,
        comment: "I love how easy it is to find affordable meals. The search by budget feature is brilliant!",
        favoriteMeal: "Mukimo",
        date: "2024-01-12",
        phone: "0745678901"
    },
    {
        id: 7,
        name: "David Omondi",
        location: "Kisumu",
        rating: 4.5,
        comment: "Best food discovery platform in Kenya. The deals are actually good and the vendors are reliable.",
        favoriteMeal: "Omena",
        date: "2024-01-08",
        phone: null
    }
];

// Slider Configuration
let currentIndex = 0;
let slidesToShow = 3;
let autoSlideInterval;
let touchStartX = 0;
let touchEndX = 0;

// Helper Functions
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) stars += '★';
    if (hasHalfStar) stars += '½';
    for (let i = 0; i < (5 - Math.ceil(rating)); i++) stars += '☆';
    
    return stars;
};

const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

// Create Testimonial Card HTML
const createTestimonialCard = (testimonial) => {
    return `
        <div class="t-card" data-id="${testimonial.id}">
            <div class="testimonial-header">
                <div class="testimonial-rating">${getRatingStars(testimonial.rating)}</div>
                <div class="testimonial-date">${formatDate(testimonial.date)}</div>
            </div>
            <p>"${testimonial.comment}"</p>
            <div class="user-info">
                <div class="user-avatar">${getInitials(testimonial.name)}</div>
                <div class="user-details">
                    <strong>${testimonial.name}</strong>
                    <div class="user-location">
                        <i class="fas fa-map-marker-alt"></i> ${testimonial.location}
                    </div>
                    ${testimonial.favoriteMeal ? `<div class="favorite-meal"><i class="fas fa-heart"></i> Loves ${testimonial.favoriteMeal}</div>` : ''}
                </div>
            </div>
        </div>
    `;
};

// Update SlidesToShow based on screen width
const updateSlidesToShow = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
};

// Render Testimonials
const renderTestimonials = () => {
    const track = document.getElementById('testimonial-track');
    if (!track) return;
    
    track.innerHTML = testimonialsDatabase.map(createTestimonialCard).join('');
    updateSliderDots();
    updateSliderPosition();
};

// Update Slider Position
const updateSliderPosition = () => {
    const track = document.getElementById('testimonial-track');
    if (!track) return;
    
    const cardWidth = document.querySelector('.t-card')?.offsetWidth || 300;
    const gap = 25;
    const slideWidth = cardWidth + gap;
    const translateX = currentIndex * slideWidth;
    
    track.style.transform = `translateX(-${translateX}px)`;
    updateActiveDot();
};

// Update Slider Dots
const updateSliderDots = () => {
    const dotsContainer = document.getElementById('slider-dots');
    if (!dotsContainer) return;
    
    const totalDots = Math.ceil(testimonialsDatabase.length / slidesToShow);
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
};

const updateActiveDot = () => {
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
};

// Navigation Functions
const goToSlide = (index) => {
    const maxIndex = Math.ceil(testimonialsDatabase.length / slidesToShow) - 1;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSliderPosition();
};

const nextSlide = () => {
    const maxIndex = Math.ceil(testimonialsDatabase.length / slidesToShow) - 1;
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateSliderPosition();
    } else if (currentIndex === maxIndex) {
        // Loop back to start
        currentIndex = 0;
        updateSliderPosition();
    }
};

const prevSlide = () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
    } else if (currentIndex === 0) {
        // Loop to end
        const maxIndex = Math.ceil(testimonialsDatabase.length / slidesToShow) - 1;
        currentIndex = maxIndex;
        updateSliderPosition();
    }
};

// Auto Slide
const startAutoSlide = () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
};

const stopAutoSlide = () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
};

// Touch Swipe Support
const initTouchSwipe = () => {
    const wrapper = document.querySelector('.testimonial-slider-wrapper');
    if (!wrapper) return;
    
    wrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    
    wrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoSlide();
    });
};

const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
    }
};

// ========================
// WHATSAPP TESTIMONIAL SUBMISSION
// ========================

// Open WhatsApp Modal
const openTestimonialModal = () => {
    const modal = document.getElementById('testimonial-modal');
    if (!modal) return;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Initialize rating selector
    initRatingSelector();
};

const closeTestimonialModal = () => {
    const modal = document.getElementById('testimonial-modal');
    if (!modal) return;
    
    modal.style.display = 'none';
    document.body.style.overflow = '';
    resetForm();
};

const resetForm = () => {
    document.getElementById('test-name').value = '';
    document.getElementById('test-location').value = '';
    document.getElementById('test-meal').value = '';
    document.getElementById('test-comment').value = '';
    document.getElementById('test-phone').value = '';
    document.getElementById('test-rating').value = '5';
    
    // Reset rating selector
    document.querySelectorAll('#rating-select span').forEach(span => {
        span.classList.remove('selected');
        if (span.dataset.rating === '5') span.classList.add('selected');
    });
};

const initRatingSelector = () => {
    const ratingSpans = document.querySelectorAll('#rating-select span');
    const ratingInput = document.getElementById('test-rating');
    
    ratingSpans.forEach(span => {
        span.addEventListener('click', () => {
            ratingSpans.forEach(s => s.classList.remove('selected'));
            span.classList.add('selected');
            ratingInput.value = span.dataset.rating;
        });
    });
};

// Submit Testimonial via WhatsApp
const submitTestimonialViaWhatsApp = async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('test-name').value.trim();
    const location = document.getElementById('test-location').value.trim();
    const meal = document.getElementById('test-meal').value.trim();
    const comment = document.getElementById('test-comment').value.trim();
    const rating = document.getElementById('test-rating').value;
    const phone = document.getElementById('test-phone').value.trim();
    
    // Validation
    if (!name || !location || !comment) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    if (comment.length < 10) {
        showNotification('Please write a more detailed review (at least 10 characters)', 'error');
        return;
    }
    
    // Format rating stars for WhatsApp
    const ratingStars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
    
    // Create WhatsApp message
    const message = `🍽️ *NEW TESTIMONIAL - FoodieBudget* 🍽️%0A%0A` +
        `*Customer:* ${name}%0A` +
        `*Location:* ${location}%0A` +
        `*Rating:* ${ratingStars} (${rating}/5)%0A` +
        `${meal ? `*Favorite Meal:* ${meal}%0A` : ''}` +
        `*Review:* "${comment}"%0A%0A` +
        `*Submitted via:* FoodieBudget Web App%0A` +
        `${phone ? `*Customer WhatsApp:* ${phone}%0A%0A` : '%0A'}` +
        `_Please review and publish this testimonial on the website._%0A%0A` +
        `Reply "CONFIRM" to approve this testimonial.`;
    
    // WhatsApp business number (replace with your actual number)
    const whatsappNumber = "254700000000";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-review-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending (open WhatsApp after short delay)
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('✓ Thank you! Your review has been sent. Check WhatsApp to complete!', 'success');
        
        // Close modal after 2 seconds
        setTimeout(() => {
            closeTestimonialModal();
        }, 2000);
        
        // Also add to local database immediately (optimistic update)
        addTestimonialToLocal({
            name,
            location,
            rating: parseFloat(rating),
            comment,
            favoriteMeal: meal || null,
            date: new Date().toISOString().split('T')[0],
            phone: phone || null,
            id: testimonialsDatabase.length + 1
        });
    }, 500);
};

// Add testimonial to local display
const addTestimonialToLocal = (newTestimonial) => {
    testimonialsDatabase.unshift(newTestimonial);
    renderTestimonials();
    showNotification('Your review is now live! 🎉', 'success');
    
    // Scroll to testimonials section
    document.querySelector('.testimonials').scrollIntoView({ behavior: 'smooth' });
};

// Show Notification
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : '#EF476F'};
        color: white;
        padding: 15px 25px;
        border-radius: 12px;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
        cursor: pointer;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
    
    notification.onclick = () => notification.remove();
};

// Add animation styles
const addNotificationStyles = () => {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// Initialize Testimonials Module
const initTestimonials = () => {
    // Set initial slidesToShow
    slidesToShow = updateSlidesToShow();
    
    // Render testimonials
    renderTestimonials();
    
    // Add event listeners for slider buttons
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Initialize share button
    const shareBtn = document.getElementById('share-testimonial-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', openTestimonialModal);
    }
    
    // Modal close handlers
    const modal = document.getElementById('testimonial-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeTestimonialModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeTestimonialModal();
        });
    }
    
    // Form submission
    const form = document.getElementById('testimonial-form');
    if (form) {
        form.addEventListener('submit', submitTestimonialViaWhatsApp);
    }
    
    // Start auto-slide
    startAutoSlide();
    
    // Pause on hover
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesToShow = updateSlidesToShow();
            if (newSlidesToShow !== slidesToShow) {
                slidesToShow = newSlidesToShow;
                currentIndex = 0;
                updateSliderDots();
                updateSliderPosition();
            }
        }, 250);
    });
    
    // Initialize touch swipe
    initTouchSwipe();
    
    // Add notification styles
    addNotificationStyles();
};

// Call this when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTestimonials();
});
const createShareModal = () => {
    // Remove existing modal if any
    const existingModal = document.getElementById('testimonial-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'testimonial-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h3>Share Your Experience</h3>
            <form id="share-form" class="share-form">
                <input type="text" id="share-name" placeholder="Your Name" required>
                <input type="text" id="share-location" placeholder="Your Location" required>
                <div class="rating-input" id="rating-input">
                    <i class="far fa-star" data-rating="1"></i>
                    <i class="far fa-star" data-rating="2"></i>
                    <i class="far fa-star" data-rating="3"></i>
                    <i class="far fa-star" data-rating="4"></i>
                    <i class="far fa-star" data-rating="5"></i>
                </div>
                <textarea id="share-comment" rows="4" placeholder="What do you think about FoodieBudget?" required></textarea>
                <button type="submit" class="primary-btn">Submit Review</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.classList.add('active');
    
    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    // Star rating interaction
    const stars = modal.querySelectorAll('#rating-input i');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.dataset.rating);
            updateStarsHover(stars, rating);
        });
        
        star.addEventListener('mouseleave', () => {
            updateStarsHover(stars, selectedRating);
        });
        
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.dataset.rating);
            updateStarsHover(stars, selectedRating, true);
        });
    });
    
    // Form submission
    const form = modal.querySelector('#share-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('share-name').value;
        const location = document.getElementById('share-location').value;
        const comment = document.getElementById('share-comment').value;
        
        if (!name || !location || !comment || selectedRating === 0) {
            alert('Please fill all fields and select a rating');
            return;
        }
        
        // Add new testimonial
        const newTestimonial = {
            id: testimonialsData.length + 1,
            name: name,
            location: location,
            rating: selectedRating,
            comment: comment,
            avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
            date: new Date().toISOString().split('T')[0]
        };
        
        testimonalsData.push(newTestimonial);
        renderTestimonials();
        modal.remove();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'Thank you for sharing your experience! 🎉';
        successMsg.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 2001;
            animation: slideUp 0.3s ease;
        `;
        document.body.appendChild(successMsg);
        setTimeout(() => successMsg.remove(), 3000);
    });
};

const updateStarsHover = (stars, rating, isPermanent = false) => {
    stars.forEach((star, index) => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
            star.className = isPermanent ? 'fas fa-star' : 'fas fa-star';
        } else {
            star.className = isPermanent ? 'far fa-star' : 'far fa-star';
        }
    });
};

// Initialize testimonials
const initTestimonials = () => {
    renderTestimonials();
    
    // Slider controls
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    startAutoSlide();
    
    // Pause auto-slide on hover
    const slider = document.getElementById('testimonial-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }
    
    initShareTestimonial();
};

// Update window resize handling
window.addEventListener('resize', () => {
    updateSliderPosition();
});
// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
