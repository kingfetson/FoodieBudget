
# 🍽️ FoodieBudget

**Eat Well, Spend Smart** - A web app that helps Kenyans find delicious meals that fit their daily budget.

![FoodieBudget Preview](/screencapture-kingfetson-github-io-FoodieBudget-2026-05-22-13_17_11.png)

## 🌟 Features

- **Budget-Based Search** - Enter your budget and find meals within your price range
- **Category Filtering** - Browse by Breakfast, Lunch, Dinner, Snacks, or Drinks
- **Smart Sorting** - Sort by price (low to high / high to low) or top ratings
- **Real-time Search** - Find specific meals instantly
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Daily Deals** - Curated list of best value meals
- **Testimonials Slider** - See what other foodies are saying
- **WhatsApp Integration** - Order meals directly via WhatsApp
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop

## 🚀 Quick Start

1. Clone or download the repository
2. Open `index.html` in your browser
3. Enter your budget (e.g., 300 KES)
4. Browse available meals within your budget
5. Click "Order Now" to order via WhatsApp

## 📱 Demo Credentials

No login required for basic features. Simply enter your budget and start exploring!

## 🛠️ Tech Stack

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (No frameworks)
- Font Awesome Icons
- Local Storage for theme preference

## 📁 Project Structure

```
foodiebudget/
├── index.html          # Main HTML structure
├── style.css           # All styles and responsive design
├── script.js           # Core functionality
└── README.md           # Documentation
```

## 🎯 How It Works

1. **Enter Budget** - Type your maximum spend (KES)
2. **Select Category** - Choose meal type or "All Categories"
3. **Click "Suggest Food"** - See meals within your budget
4. **Filter Further** - Use search or sorting options
5. **Order** - Click "Order Now" to send WhatsApp order

## 🍕 Sample Meals Database

| Meal | Category | Price (KES) | Rating |
|------|----------|-------------|--------|
| Nyama Choma + Ugali | Dinner | 350 | 4.8 |
| Chips + Chicken | Lunch | 250 | 4.5 |
| Pilau Beef | Dinner | 280 | 4.7 |
| Mahamri + Chai | Breakfast | 70 | 4.3 |
| Samosa (2pcs) | Snacks | 80 | 4.6 |

*Includes 15+ Kenyan meals*

## 📞 WhatsApp Order Format

When you click "Order Now", the following message template opens in WhatsApp:

```
🍽️ New Order from FoodieBudget 🍽️

Customer: [Your Name]
Meal: [Meal Name] (KES [Price])
Location: [Your Area]
Platform: FoodieBudget Web App
```

## 🎨 Color Scheme

- **Primary**: `#FF6B35` (Orange)
- **Secondary**: `#EF476F` (Pink/Red)
- **Light Mode**: Cream background with white cards
- **Dark Mode**: Dark background with dark cards

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (3 columns)
- **Tablet**: 768px - 1024px (2 columns)
- **Mobile**: < 768px (1 column)

## 🔧 Customization

### Adding New Meals

Edit the `mealDatabase` array in `script.js`:

```javascript
{ 
    id: 36, 
    name: "Your Meal Name", 
    category: "Lunch", 
    price: 200, 
    rating: 4.5, 
    image: "image-url.jpg", 
    description: "Meal description" 
}
```

### Changing WhatsApp Number

Update the phone number in `script.js`:

```javascript
const phoneNumber = "254700000000"; // Replace with your number
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📄 License

MIT License - Free for personal and commercial use

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

- **Email**: hello@foodiebudget.com
- **Phone**: +254 700 000 000
- **Location**: Nairobi, Kenya

## 🙏 Acknowledgments

- Icons by [Font Awesome](https://fontawesome.com/)
- Images from [Unsplash](https://unsplash.com/)
- Inspiration from Kenyan food culture

---

**Made with ❤️ for Kenyan Foodies**
