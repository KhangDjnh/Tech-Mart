import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/customer/home';
import Profiles from '../components/Profile';
import Login from '../pages/Login';
import Register from '../pages/Register';
import DetailProduct from '../pages/customer/DetailProduct';
import CustomerRoutes from './CustomerRouters';
import EmployeeRoutes from './EmployeeRouters';
//import ManagerRoutes from './ManagerRoutes';
//import AdminRoutes from './AdminRoutes';

function AppRouter() {
  return (
    <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/product/:id" element={<DetailProduct  />} />

        <Route path="/customer/*" element={<CustomerRoutes />} />
        <Route path="/employee/*" element={<EmployeeRoutes />} />
        {/* <Route path="/manager/*" element={<ManagerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} /> */}
      </Routes>
  );
}

export default AppRouter;
