// Food Database
const foodDatabase = [
    { name: "Pilau Beef", price: 250, category: "Lunch", image: "https://images.unsplash.com/photo-1567333160917-21787d54f83b?auto=format&fit=crop&w=500&q=80", description: "Delicious spicy beef pilau with kachumbari.", rating: 4.8 },
    { name: "Ugali Sukuma & Beef", price: 200, category: "Dinner", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80", description: "A classic Kenyan staple for strength.", rating: 4.5 },
    { name: "Chapati Beans", price: 120, category: "Lunch", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80", description: "Two soft chapatis with coconut beans.", rating: 4.2 },
    { name: "Chips Masala", price: 150, category: "Snacks", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=500&q=80", description: "Spicy and saucy potato fries.", rating: 4.7 },
    { name: "Samosa (Pair)", price: 50, category: "Snacks", image: "https://images.unsplash.com/photo-1601050633647-81a35d377f61?auto=format&fit=crop&w=500&q=80", description: "Crispy pastry with minced meat filling.", rating: 4.6 },
    { name: "Mandazi & Tea", price: 60, category: "Breakfast", image: "https://images.unsplash.com/photo-1544787210-2211dca2066c?auto=format&fit=crop&w=500&q=80", description: "Fluffy mandazi with spiced chai.", rating: 4.4 },
    { name: "Beef Burger", price: 450, category: "Lunch", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80", description: "Juicy patty with cheese and lettuce.", rating: 4.9 },
    { name: "Smokie Pasua", price: 40, category: "Snacks", image: "https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?auto=format&fit=crop&w=500&q=80", description: "Street style smokie with kachumbari.", rating: 4.3 },
    { name: "Margherita Pizza", price: 800, category: "Dinner", image: "https://images.unsplash.com/photo-1574123818858-4850a72610b4?auto=format&fit=crop&w=500&q=80", description: "Classic tomato and mozzarella pizza.", rating: 4.7 },
    { name: "Fruit Salad", price: 150, category: "Drinks", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80", description: "Seasonal fresh tropical fruits.", rating: 4.5 },
    { name: "Soda (500ml)", price: 70, category: "Drinks", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80", description: "Chilled Coca-Cola or Fanta.", rating: 4.0 },
    { name: "Chicken Biryani", price: 550, category: "Lunch", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80", description: "Aromatic rice with spiced chicken.", rating: 4.9 },
    { name: "Bhajia", price: 100, category: "Snacks", image: "https://images.unsplash.com/photo-1601050633647-81a35d377f61?auto=format&fit=crop&w=500&q=80", description: "Battered and deep fried potato slices.", rating: 4.4 },
    { name: "Spanish Omelette", price: 180, category: "Breakfast", image: "https://images.unsplash.com/photo-1510627489930-0c1b0ba846a9?auto=format&fit=crop&w=500&q=80", description: "Two eggs with onions and peppers.", rating: 4.5 }
];

// DOM Elements
const foodGrid = document.getElementById('food-grid');
const budgetInput = document.getElementById('budget-input');
const categorySelect = document.getElementById('category-select');
const suggestBtn = document.getElementById('suggest-btn');
const searchBar = document.getElementById('search-bar');
const sortSelect = document.getElementById('sort-select');
const emptyState = document.getElementById('empty-state');
const loading = document.getElementById('loading-spinner');
const themeToggle = document.getElementById('theme-toggle');

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    displayFoods(foodDatabase);
    renderDeals();
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Core Function: Display Food Cards
function displayFoods(data) {
    foodGrid.innerHTML = '';
    
    if (data.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'food-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-img">
            <div class="food-info">
                <div class="food-price">KES ${item.price}</div>
                <h3>${item.name}</h3>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin: 5px 0;">${item.category} • ⭐ ${item.rating}</p>
                <p style="font-size: 0.9rem; margin-bottom: 10px;">${item.description}</p>
                <button class="order-btn">Order Now</button>
            </div>
        `;
        foodGrid.appendChild(card);
    });
}

// Logic: Filter and Suggest
suggestBtn.addEventListener('click', () => {
    const budget = parseFloat(budgetInput.value) || Infinity;
    const category = categorySelect.value;
    
    loading.classList.remove('hidden');
    foodGrid.classList.add('hidden');

    setTimeout(() => {
        let filtered = foodDatabase.filter(food => {
            const matchesBudget = food.price <= budget;
            const matchesCategory = category === 'All' || food.category === category;
            return matchesBudget && matchesCategory;
        });
        
        displayFoods(filtered);
        loading.classList.add('hidden');
        foodGrid.classList.remove('hidden');
    }, 600);
});

// Search and Sort
searchBar.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = foodDatabase.filter(f => f.name.toLowerCase().includes(term));
    displayFoods(filtered);
});

sortSelect.addEventListener('change', (e) => {
    let sorted = [...foodDatabase];
    if (e.target.value === 'low') sorted.sort((a, b) => a.price - b.price);
    if (e.target.value === 'high') sorted.sort((a, b) => b.price - a.price);
    if (e.target.value === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    displayFoods(sorted);
});

// Best Deals (Cheapest)
function renderDeals() {
    const dealsContainer = document.getElementById('deals-container');
    const cheapItems = [...foodDatabase].sort((a, b) => a.price - b.price).slice(0, 5);
    
    cheapItems.forEach(item => {
        const div = document.createElement('div');
        div.style.minWidth = "250px";
        div.innerHTML = `
            <div class="food-card">
                <img src="${item.image}" class="food-img" style="height: 150px">
                <div class="food-info">
                    <h4>${item.name}</h4>
                    <div class="food-price">KES ${item.price}</div>
                </div>
            </div>
        `;
        dealsContainer.appendChild(div);
    });
}
