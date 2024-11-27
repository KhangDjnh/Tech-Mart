import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/customer/Home';
//import Cart from '../pages/Customer/Cart';
//import Order from '../pages/Customer/Order';
//import OrderDetail from '../pages/Customer/OrderDetail';
//import Profile from '../pages/Customer/Profile';

function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/cart" element={<Cart />} />
      <Route path="/orders" element={<Order />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/profile" element={<Profile />} /> */}
    </Routes>
  );
}

export default CustomerRoutes;
