# Paradise Nursery

Paradise Nursery is an online plant shop built with **React** and **Redux Toolkit**.
Customers land on a welcome page, browse houseplants by category, add them to a
shopping cart and review their order.

## Project name

**Paradise Nursery** - *Where Green Meets Serenity*

## Features

- Landing page with a background image, the company name and a **Get Started** button
- About Us section describing the company
- Product listing page with 6 plant categories (6 plants each), each with an image, name, description, price and an **Add to Cart** button
- Navigation bar with **Plants** and **Cart** links; the cart icon shows the total number of plants
- Shopping cart page with item thumbnail, name, unit price, quantity, per-item total, increase/decrease buttons, **Delete** button, total cart amount, **Continue Shopping** and **Checkout** ("Coming Soon") buttons
- Redux state in `CartSlice.jsx` with the reducers `addItem`, `removeItem` and `updateQuantity`

## Project structure

```
src/
  App.jsx          Landing page
  App.css          Landing page styles (background image)
  AboutUs.jsx      Company details
  ProductList.jsx  Plant listing and navigation bar
  CartItem.jsx     Shopping cart page
  CartSlice.jsx    Redux slice for the cart
  store.js         Redux store
```

## Getting started

```
npm install
npm run dev
```

Open the local address printed in the terminal.
