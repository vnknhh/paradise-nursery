import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`} style={{ display: showProductList ? 'none' : 'flex' }}>
        <div className="landing-content">
          <h1>Welcome To Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
          <AboutUs />
        </div>
      </div>

      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        {showProductList && <ProductList />}
      </div>
    </div>
  );
}

export default App;
