//import logo from './logo.svg';
//import './App.css';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { createTheme, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import Layout from './features/layout/Layout';
import Home from './features/home/Home.jsx';
//import ProductDetailPage from './features/products/ProductDetailPage.jsx';
//import Checkout from './features/checkout/Checkout.jsx'; NO SE PARA QUE ES

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
}

export default App;
