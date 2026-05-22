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

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
