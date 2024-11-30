import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeHome from '../pages/employee/EmployeeHome';
import ProductList from '../components/employee/ProductList';
import OrderList from '../pages/employee/OrderList';
import CustomerInfo from '../pages/employee/CustomerInfo';
import ProductDetail from '../pages/employee/ProductDetail';
import ChatSupport from '../pages/employee/ChatSupport';

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeHome />}>
        <Route index element={<ProductList/>} />
        <Route path="order" element={<OrderList />} />
        <Route path="product" element={<ProductList/>} />
        <Route path="customer-info" element={<CustomerInfo />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="chat-support" element={<ChatSupport />} />
      </Route>
      {/* <Route path="/orders" element={<OrderList />} />
      <Route path="/customer-info" element={<CustomerInfo />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/chat-support" element={<ChatSupport />} /> */}
    </Routes>
  );
}

export default EmployeeRoutes;
