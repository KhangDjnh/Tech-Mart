import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeHome from '../pages/employee/EmployeeHome';
import ProductList from '../components/employee/ProductManager/ProductList';
import ProductDetail from '../components/employee/ProductManager/ProductDetail';
import OrderManager from '../components/employee/OrderManager/OrderManager';
import CustomerInfo from '../pages/employee/CustomerInfo';
import ChatSupport from '../pages/employee/ChatSupport';
import ProductManager from '../pages/employee/ProductManager';

function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EmployeeHome />}>
        <Route index element={<ProductList/>} />
        <Route path="order" element={<OrderManager />} />
        <Route path="product" element={<ProductManager/>}>
          <Route index element={<ProductList/>} />
          <Route path="new" element={<ProductDetail />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>
        <Route path="customer-info" element={<CustomerInfo />} />
        <Route path="chat-support" element={<ChatSupport />} />
      </Route>
    </Routes>
  );
}

export default EmployeeRoutes;
