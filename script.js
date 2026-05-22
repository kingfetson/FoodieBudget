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
    if (DOM.loadingSpinner) DOM.loadingSpinner.classList.remove('hidden');
    if (DOM.foodGrid) DOM.foodGrid.classList.add('hidden');
    if (DOM.emptyState) DOM.emptyState.classList.add('hidden');
};

const hideLoading = () => {
    if (DOM.loadingSpinner) DOM.loadingSpinner.classList.add('hidden');
    if (DOM.foodGrid) DOM.foodGrid.classList.remove('hidden');
};

const showEmptyState = () => {
    if (DOM.foodGrid) DOM.foodGrid.classList.add('hidden');
    if (DOM.emptyState) DOM.emptyState.classList.remove('hidden');
};

const hideEmptyState = () => {
    if (DOM.emptyState) DOM.emptyState.classList.add('hidden');
    if (DOM.foodGrid) DOM.foodGrid.classList.remove('hidden');
};

// Filter meals based on budget, category, and search
const filterMeals = () => {
    let meals = [...mealDatabase];
    
    meals = meals.filter(meal => meal.price <= AppState.currentBudget);
    
    if (AppState.currentCategory !== "All") {
        meals = meals.filter(meal => meal.category === AppState.currentCategory);
    }
    
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
        if (DOM.foodGrid) DOM.foodGrid.innerHTML = '';
    } else {
        hideEmptyState();
        if (DOM.foodGrid) DOM.foodGrid.innerHTML = sorted.map(createFoodCard).join('');
        
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
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
};

// Render deals section
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
    
    document.querySelectorAll('#deals-container .order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const mealName = btn.getAttribute('data-name');
            const mealPrice = btn.getAttribute('data-price');
            populateWhatsAppForm(mealName, mealPrice);
        });
    });
};

const updateUI = () => {
    showLoading();
    setTimeout(() => {
        renderMeals();
        hideLoading();
    }, 300);
};

// ========================
// EVENT HANDLERS
// ========================
const handleSuggestMeal = () => {
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

const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
};

const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        AppState.theme = 'light';
        localStorage.setItem('foodie-theme', 'light');
        if (DOM.themeToggle) DOM.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        AppState.theme = 'dark';
        localStorage.setItem('foodie-theme', 'dark');
        if (DOM.themeToggle) DOM.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
};

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

const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    const name = DOM.waName?.value.trim();
    const meal = DOM.waMeal?.value.trim();
    const location = DOM.waLocation?.value.trim();
    
    if (!name || !meal || !location) {
        alert("Please fill in all fields to place your order");
        return;
    }
    
    const message = `🍽️ *New Order from FoodieBudget* 🍽️%0A%0A*Customer:* ${name}%0A*Meal:* ${meal}%0A*Location:* ${location}%0A*Platform:* FoodieBudget Web App%0A%0A_This is an automated order request. Please respond to confirm._`;
    const phoneNumber = "254700000000";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    alert(`✅ Order placed! You'll be redirected to WhatsApp to complete your order for ${meal}`);
};

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

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "") return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
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

const initEventListeners = () => {
    if (DOM.suggestBtn) DOM.suggestBtn.addEventListener('click', handleSuggestMeal);
    if (DOM.searchBar) DOM.searchBar.addEventListener('input', debounce(handleSearch, 300));
    if (DOM.sortSelect) DOM.sortSelect.addEventListener('change', handleSort);
    if (DOM.themeToggle) DOM.themeToggle.addEventListener('click', toggleTheme);
    if (DOM.whatsappForm) DOM.whatsappForm.addEventListener('submit', handleWhatsAppSubmit);
    if (DOM.budgetInput) {
        DOM.budgetInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSuggestMeal();
        });
    }
};

const setDefaultBudget = () => {
    if (DOM.budgetInput) {
        DOM.budgetInput.value = "300";
        AppState.currentBudget = 300;
    }
};

// ========================
// TESTIMONIALS MODULE
// ========================
const testimonialsDatabase = [
    { id: 1, name: "Brian Kipchoge", location: "Nairobi, CBD", rating: 5, comment: "This app helps me choose meals daily! Perfect for campus students. I've saved over 2000 KES this month alone.", favoriteMeal: "Nyama Choma", date: "2024-01-15", phone: "0712345678" },
    { id: 2, name: "Stacy Wanjiku", location: "Westlands", rating: 5, comment: "Amazing food suggestions! I never knew I could get Pilau for that cheap. The WhatsApp order feature is a game-changer!", favoriteMeal: "Pilau Beef", date: "2024-01-10", phone: "0723456789" },
    { id: 3, name: "James Otieno", location: "Kilimani", rating: 5, comment: "Finally an app that understands Kenyan pockets. The deals section saves me everyday. Highly recommended!", favoriteMeal: "Chips Chicken", date: "2024-01-05", phone: null },
    { id: 4, name: "Mary Njeri", location: "Eastlands", rating: 5, comment: "As a mom of two, budgeting meals is crucial. FoodieBudget helps me plan weekly meals without breaking the bank.", favoriteMeal: "Githeri", date: "2024-01-03", phone: "0734567890" },
    { id: 5, name: "Peter Mwangi", location: "Thika Road", rating: 4, comment: "Great variety of meals and very accurate budget suggestions. The UI is beautiful and easy to use.", favoriteMeal: "Chapati Beans", date: "2023-12-28", phone: null },
    { id: 6, name: "Sarah Chemutai", location: "Eldoret", rating: 5, comment: "I love how easy it is to find affordable meals. The search by budget feature is brilliant!", favoriteMeal: "Mukimo", date: "2024-01-12", phone: "0745678901" },
    { id: 7, name: "David Omondi", location: "Kisumu", rating: 4.5, comment: "Best food discovery platform in Kenya. The deals are actually good and the vendors are reliable.", favoriteMeal: "Omena", date: "2024-01-08", phone: null }
];

let testimonialCurrentIndex = 0;
let testimonialSlidesToShow = 3;
let testimonialAutoSlideInterval;
let testimonialTouchStartX = 0;
let testimonialTouchEndX = 0;

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
                    <div class="user-location"><i class="fas fa-map-marker-alt"></i> ${testimonial.location}</div>
                    ${testimonial.favoriteMeal ? `<div class="favorite-meal"><i class="fas fa-heart"></i> Loves ${testimonial.favoriteMeal}</div>` : ''}
                </div>
            </div>
        </div>
    `;
};

const updateTestimonialSlidesToShow = () => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
};

const renderTestimonials = () => {
    const track = document.getElementById('testimonial-track');
    if (!track) return;
    track.innerHTML = testimonialsDatabase.map(createTestimonialCard).join('');
    updateTestimonialDots();
    updateTestimonialPosition();
};

const updateTestimonialPosition = () => {
    const track = document.getElementById('testimonial-track');
    if (!track) return;
    const cardWidth = document.querySelector('.t-card')?.offsetWidth || 300;
    const gap = 25;
    const slideWidth = cardWidth + gap;
    const translateX = testimonialCurrentIndex * slideWidth;
    track.style.transform = `translateX(-${translateX}px)`;
    updateActiveTestimonialDot();
};

const updateTestimonialDots = () => {
    const dotsContainer = document.getElementById('slider-dots');
    if (!dotsContainer) return;
    const totalDots = Math.ceil(testimonialsDatabase.length / testimonialSlidesToShow);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === testimonialCurrentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonialSlide(i));
        dotsContainer.appendChild(dot);
    }
};

const updateActiveTestimonialDot = () => {
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === testimonialCurrentIndex);
    });
};

const goToTestimonialSlide = (index) => {
    const maxIndex = Math.ceil(testimonialsDatabase.length / testimonialSlidesToShow) - 1;
    testimonialCurrentIndex = Math.max(0, Math.min(index, maxIndex));
    updateTestimonialPosition();
};

const nextTestimonialSlide = () => {
    const maxIndex = Math.ceil(testimonialsDatabase.length / testimonialSlidesToShow) - 1;
    if (testimonialCurrentIndex < maxIndex) {
        testimonialCurrentIndex++;
        updateTestimonialPosition();
    } else if (testimonialCurrentIndex === maxIndex) {
        testimonialCurrentIndex = 0;
        updateTestimonialPosition();
    }
};

const prevTestimonialSlide = () => {
    const maxIndex = Math.ceil(testimonialsDatabase.length / testimonialSlidesToShow) - 1;
    if (testimonialCurrentIndex > 0) {
        testimonialCurrentIndex--;
        updateTestimonialPosition();
    } else if (testimonialCurrentIndex === 0) {
        testimonialCurrentIndex = maxIndex;
        updateTestimonialPosition();
    }
};

const startTestimonialAutoSlide = () => {
    if (testimonialAutoSlideInterval) clearInterval(testimonialAutoSlideInterval);
    testimonialAutoSlideInterval = setInterval(() => {
        nextTestimonialSlide();
    }, 5000);
};

const stopTestimonialAutoSlide = () => {
    if (testimonialAutoSlideInterval) clearInterval(testimonialAutoSlideInterval);
};

const initTestimonialTouchSwipe = () => {
    const wrapper = document.querySelector('.testimonial-slider-wrapper');
    if (!wrapper) return;
    wrapper.addEventListener('touchstart', (e) => {
        testimonialTouchStartX = e.changedTouches[0].screenX;
        stopTestimonialAutoSlide();
    });
    wrapper.addEventListener('touchend', (e) => {
        testimonialTouchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        if (testimonialTouchEndX < testimonialTouchStartX - swipeThreshold) {
            nextTestimonialSlide();
        } else if (testimonialTouchEndX > testimonialTouchStartX + swipeThreshold) {
            prevTestimonialSlide();
        }
        startTestimonialAutoSlide();
    });
};

// Show Notification
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i><span>${message}</span>`;
    notification.style.cssText = `
        position: fixed; bottom: 20px; right: 20px;
        background: ${type === 'success' ? '#25D366' : '#EF476F'};
        color: white; padding: 15px 25px; border-radius: 12px;
        z-index: 10000; display: flex; align-items: center; gap: 12px;
        font-weight: 500; box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        cursor: pointer;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
    notification.onclick = () => notification.remove();
};

const initRatingSelector = () => {
    const ratingSpans = document.querySelectorAll('#rating-select span');
    const ratingInput = document.getElementById('test-rating');
    ratingSpans.forEach(span => {
        span.addEventListener('click', () => {
            ratingSpans.forEach(s => s.classList.remove('selected'));
            span.classList.add('selected');
            if (ratingInput) ratingInput.value = span.dataset.rating;
        });
    });
};

const resetTestimonialForm = () => {
    const nameInput = document.getElementById('test-name');
    const locationInput = document.getElementById('test-location');
    const mealInput = document.getElementById('test-meal');
    const commentInput = document.getElementById('test-comment');
    const phoneInput = document.getElementById('test-phone');
    const ratingInput = document.getElementById('test-rating');
    
    if (nameInput) nameInput.value = '';
    if (locationInput) locationInput.value = '';
    if (mealInput) mealInput.value = '';
    if (commentInput) commentInput.value = '';
    if (phoneInput) phoneInput.value = '';
    if (ratingInput) ratingInput.value = '5';
    
    document.querySelectorAll('#rating-select span').forEach(span => {
        span.classList.remove('selected');
        if (span.dataset.rating === '5') span.classList.add('selected');
    });
};

const openTestimonialModal = () => {
    const modal = document.getElementById('testimonial-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    initRatingSelector();
};

const closeTestimonialModal = () => {
    const modal = document.getElementById('testimonial-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
    resetTestimonialForm();
};

const addTestimonialToLocal = (newTestimonial) => {
    testimonialsDatabase.unshift(newTestimonial);
    renderTestimonials();
    showNotification('Your review is now live! 🎉', 'success');
    document.querySelector('.testimonials')?.scrollIntoView({ behavior: 'smooth' });
};

const submitTestimonialViaWhatsApp = (e) => {
    e.preventDefault();
    
    const name = document.getElementById('test-name')?.value.trim();
    const location = document.getElementById('test-location')?.value.trim();
    const meal = document.getElementById('test-meal')?.value.trim();
    const comment = document.getElementById('test-comment')?.value.trim();
    const rating = document.getElementById('test-rating')?.value || '5';
    const phone = document.getElementById('test-phone')?.value.trim();
    
    if (!name || !location || !comment) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    if (comment.length < 10) {
        showNotification('Please write a more detailed review (at least 10 characters)', 'error');
        return;
    }
    
    const ratingStars = '★'.repeat(parseInt(rating)) + '☆'.repeat(5 - parseInt(rating));
    const message = `🍽️ *NEW TESTIMONIAL - FoodieBudget* 🍽️%0A%0A*Customer:* ${name}%0A*Location:* ${location}%0A*Rating:* ${ratingStars} (${rating}/5)%0A${meal ? `*Favorite Meal:* ${meal}%0A` : ''}*Review:* "${comment}"%0A%0A*Submitted via:* FoodieBudget Web App%0A${phone ? `*Customer WhatsApp:* ${phone}%0A%0A` : '%0A'}_Please review and publish this testimonial on the website._`;
    
    const whatsappNumber = "254700000000";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    
    const submitBtn = document.querySelector('.submit-review-btn');
    const originalText = submitBtn?.innerHTML || 'Submit';
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
        showNotification('✓ Thank you! Your review has been sent!', 'success');
        setTimeout(() => closeTestimonialModal(), 2000);
        
        addTestimonialToLocal({
            name, location, rating: parseFloat(rating), comment,
            favoriteMeal: meal || null,
            date: new Date().toISOString().split('T')[0],
            phone: phone || null,
            id: testimonialsDatabase.length + 1
        });
    }, 500);
};

// Initialize Testimonials Module
const initTestimonials = () => {
    testimonialSlidesToShow = updateTestimonialSlidesToShow();
    renderTestimonials();
    
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    
    if (prevBtn) prevBtn.addEventListener('click', () => { prevTestimonialSlide(); stopTestimonialAutoSlide(); startTestimonialAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextTestimonialSlide(); stopTestimonialAutoSlide(); startTestimonialAutoSlide(); });
    
    const shareBtn = document.getElementById('share-testimonial-btn');
    if (shareBtn) shareBtn.addEventListener('click', openTestimonialModal);
    
    const modal = document.getElementById('testimonial-modal');
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeTestimonialModal);
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeTestimonialModal(); });
    
    const form = document.getElementById('testimonial-form');
    if (form) form.addEventListener('submit', submitTestimonialViaWhatsApp);
    
    startTestimonialAutoSlide();
    
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopTestimonialAutoSlide);
        sliderContainer.addEventListener('mouseleave', startTestimonialAutoSlide);
    }
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newSlidesToShow = updateTestimonialSlidesToShow();
            if (newSlidesToShow !== testimonialSlidesToShow) {
                testimonialSlidesToShow = newSlidesToShow;
                testimonialCurrentIndex = 0;
                updateTestimonialDots();
                updateTestimonialPosition();
            }
        }, 250);
    });
    
    initTestimonialTouchSwipe();
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
    initTestimonials();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
