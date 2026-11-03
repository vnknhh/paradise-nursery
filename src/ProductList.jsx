import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './ProductList.css';

// Builds a small illustrated plant picture (SVG data URI) so images always load
const plantImage = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">` +
      `<rect width="300" height="300" fill="${bg}"/>` +
      `<text x="150" y="190" font-size="130" text-anchor="middle">${emoji}</text>` +
      `</svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: plantImage('🌿', '#e8f5e9'), description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: plantImage('🌱', '#f1f8e9'), description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: plantImage('🌼', '#fffde7'), description: 'Removes mold spores and purifies the air.', cost: '$18' },
      { name: 'Boston Fern', image: plantImage('🍃', '#e0f2f1'), description: 'Adds humidity to the air and removes toxins.', cost: '$20' },
      { name: 'Rubber Plant', image: plantImage('🪴', '#e8f5e9'), description: 'Easily grown, it absorbs airborne chemicals.', cost: '$17' },
      { name: 'Aloe Vera', image: plantImage('🌵', '#f9fbe7'), description: 'Purifies the air and its gel soothes burns.', cost: '$14' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: plantImage('💜', '#ede7f6'), description: 'Calming scent that helps with relaxation and sleep.', cost: '$20' },
      { name: 'Jasmine', image: plantImage('🌸', '#fce4ec'), description: 'Sweet fragrance that lifts the mood.', cost: '$18' },
      { name: 'Rosemary', image: plantImage('🌿', '#e8f5e9'), description: 'Fragrant herb used in cooking and aromatherapy.', cost: '$15' },
      { name: 'Mint', image: plantImage('🍃', '#e0f7fa'), description: 'Refreshing aroma, great for teas and cocktails.', cost: '$12' },
      { name: 'Lemon Balm', image: plantImage('🍋', '#fffde7'), description: 'Citrus scent that eases stress and repels pests.', cost: '$14' },
      { name: 'Hyacinth', image: plantImage('🌷', '#f3e5f5'), description: 'Spring flower with an intense, sweet perfume.', cost: '$22' },
    ],
  },
  {
    category: 'Insect Repellent Plants',
    plants: [
      { name: 'Citronella', image: plantImage('🌾', '#f1f8e9'), description: 'Its lemony scent keeps mosquitoes away.', cost: '$16' },
      { name: 'Marigold', image: plantImage('🌻', '#fff8e1'), description: 'Bright flowers that deter many garden pests.', cost: '$10' },
      { name: 'Basil', image: plantImage('🌿', '#e8f5e9'), description: 'Repels flies and mosquitoes, and tastes great.', cost: '$9' },
      { name: 'Catnip', image: plantImage('🐱', '#e3f2fd'), description: 'Natural repellent that cats love.', cost: '$11' },
      { name: 'Lemongrass', image: plantImage('🌱', '#f9fbe7'), description: 'Strong citrus scent that masks insect attractants.', cost: '$13' },
      { name: 'Chrysanthemum', image: plantImage('🏵️', '#fce4ec'), description: 'Contains pyrethrum, a natural insecticide.', cost: '$19' },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Echinacea', image: plantImage('🌸', '#f3e5f5'), description: 'Traditionally used to support the immune system.', cost: '$17' },
      { name: 'Chamomile', image: plantImage('🌼', '#fffde7'), description: 'Calming flowers used for soothing tea.', cost: '$13' },
      { name: 'Ginger', image: plantImage('🫚', '#fff3e0'), description: 'Root used to ease nausea and digestion.', cost: '$16' },
      { name: 'Turmeric', image: plantImage('🟡', '#fff8e1'), description: 'Known for its anti-inflammatory properties.', cost: '$18' },
      { name: 'Calendula', image: plantImage('🌻', '#fff3e0'), description: 'Petals used in creams that soothe the skin.', cost: '$12' },
      { name: 'Feverfew', image: plantImage('🌼', '#f1f8e9'), description: 'Herb traditionally used to relieve headaches.', cost: '$14' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: plantImage('🪴', '#e8f5e9'), description: 'Thrives in low light and tolerates missed waterings.', cost: '$25' },
      { name: 'Pothos', image: plantImage('🍃', '#e0f2f1'), description: 'Trailing vine that grows almost anywhere.', cost: '$10' },
      { name: 'Cast Iron Plant', image: plantImage('🌿', '#f1f8e9'), description: 'Nearly indestructible, even in deep shade.', cost: '$22' },
      { name: 'Jade Plant', image: plantImage('💚', '#e8f5e9'), description: 'Succulent that stores water in thick leaves.', cost: '$15' },
      { name: 'Chinese Evergreen', image: plantImage('🌱', '#f9fbe7'), description: 'Tolerates low light and irregular care.', cost: '$19' },
      { name: 'Ponytail Palm', image: plantImage('🌴', '#fff8e1'), description: 'Drought tolerant plant with a quirky look.', cost: '$21' },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: plantImage('🪷', '#fce4ec'), description: 'Rosette-shaped succulent in soft pastel colors.', cost: '$11' },
      { name: 'Haworthia', image: plantImage('🌵', '#e8f5e9'), description: 'Small striped succulent, perfect for desks.', cost: '$12' },
      { name: 'Barrel Cactus', image: plantImage('🌵', '#fff8e1'), description: 'Round cactus that needs plenty of sun.', cost: '$18' },
      { name: 'String of Pearls', image: plantImage('🫛', '#e0f2f1'), description: 'Trailing succulent with bead-like leaves.', cost: '$16' },
      { name: 'Burro\'s Tail', image: plantImage('🌿', '#f1f8e9'), description: 'Hanging stems covered in plump leaves.', cost: '$17' },
      { name: 'Christmas Cactus', image: plantImage('🎄', '#fce4ec'), description: 'Blooms in winter with bright pink flowers.', cost: '$20' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  // Total number of plants in the cart, shown next to the cart icon
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  // A plant counts as "added" if it was clicked or is currently in the cart
  const isInCart = (name) =>
    addedToCart[name] || cartItems.some((item) => item.name === name);

  return (
    <div>
      <div className="navbar">
        <div className="navbar-left">
          <img
            src={plantImage('🌿', '#1b5e20')}
            alt="Paradise Nursery logo"
            className="logo"
          />
          <div className="brand">
            <h3>Paradise Nursery</h3>
            <i>Where Green Meets Serenity</i>
          </div>
        </div>
        <div className="navbar-right">
          <a href="#" onClick={handlePlantsClick} className="nav-link">Plants</a>
          <a href="#" onClick={handleCartClick} className="nav-link cart-link" aria-label="Shopping cart">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="42" height="42">
              <rect width="156" height="156" x="50" y="50" fill="none" />
              <circle cx="80" cy="216" r="12" fill="#faf9f9" />
              <circle cx="184" cy="216" r="12" fill="#faf9f9" />
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="14"
              />
            </svg>
            <span className="cart_quantity_count">{totalQuantity}</span>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category) => (
            <div key={category.category}>
              <h1 className="category-title">{category.category}</h1>
              <div className="product-list">
                {category.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-price">{plant.cost}</div>
                    <button
                      className={`product-button ${isInCart(plant.name) ? 'added-to-cart' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
