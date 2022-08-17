import React from 'react';
import Header from './Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Products from './Products/Products';
import Cart from './Cart/Cart';
import Details from './Details/Details';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
