import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeHome from '../pages/employee/EmployeeHome';
//import OrderList from '../pages/Employee/OrderList';
//import CustomerInfo from '../pages/Employee/CustomerInfo';
//import ProductDetail from '../pages/Employee/ProductDetail';
//import ChatSupport from '../pages/Employee/ChatSupport';

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<EmployeeHome />} />
      {/* <Route path="/orders" element={<OrderList />} />
      <Route path="/customer-info" element={<CustomerInfo />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/chat-support" element={<ChatSupport />} /> */}
    </Routes>
  );
}

export default EmployeeRoutes;
