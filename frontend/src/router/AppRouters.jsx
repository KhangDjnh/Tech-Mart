import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../pages/customer/Home.jsx";
import Login from "../pages/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CategoryItem from "../pages/customer/CategoryItem.jsx";
import DetailProduct from "../pages/customer/DetailProduct.jsx";
import CreateAccount from "../pages/customer/CreateAccount.jsx";
import ShoppingCart from "../pages/customer/ShoppingCart.jsx";
import Chatboard from "../pages/customer/Chatboard/Chatboard.jsx";
import HomeManage from "../pages/managge/HomeManage.jsx";
import Users from "../pages/managge/Users.jsx";
import Products from "../pages/managge/Products.jsx";
import DetailUserInfor from "../pages/customer/DetailUserInfor.jsx";
import OrderStatus from "../pages/customer/OrderStatus.jsx";
import ManageStatusProduct from "../pages/managge/ManageStatusProduct.jsx";
import Dashboard from "../pages/managge/Dashboard.jsx";
import ConfirmCheckout from "../pages/customer/ConfirmCheckout.jsx";
import ConfirmEmail from "../pages/customer/ConfirmEmail.jsx";
import { useDispatch } from "react-redux";
import { productApi } from "../../api/productApi.js";
import { fetchData } from "../store/actions/productAction.js";
import ForgotPassword from "../pages/customer/ForgotPassword.jsx";


import EmployeeHome from '../pages/employee/EmployeeHome';
import ProductList from '../components/employee/ProductManager/ProductList';
import ProductDetail from '../components/employee/ProductManager/ProductDetail';
import OrderManager from '../components/employee/OrderManager/OrderManager.jsx';
import EmployeeManager from '../components/manager/EmployeeManager.jsx';
import ProductManager from '../pages/employee/ProductManager';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}
function AppRouters() {
    const dispatch = useDispatch();
    const fetchDataAsync = async () => {
        try {
            const res = await productApi.getProduct();
            dispatch(fetchData(res.data.data));
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchDataAsync();
    }, []);
    return (
        <div>
            <ScrollToTop />
            <Routes>
                {/* Shared */}
                <Route path="/employee" element={
                    <EmployeeHome />}>
                    <Route index element={<ProductList/>} />
                    <Route path="order" element={<OrderManager />} />
                    <Route path="product" element={<ProductManager/>}>
                    <Route index element={<ProductList/>} />
                        <Route path="new" element={<ProductDetail />} />
                        <Route path=":id" element={<ProductDetail />} />
                    </Route>
                    <Route path="employee_manager" element={<EmployeeManager />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/confirmemail" element={<ConfirmEmail />} />
                <Route path={'/forgotpassword'} element={<ForgotPassword />} />
                {/* Customer */}
                <Route path="/" element={<Home />} />
                <Route path="/createAccount" element={<CreateAccount />} />
                <Route
                    path="/orderstatus"
                    element={
                        // <PrivateRoute roles={['customer']}>
                        //     <OrderStatus />
                        // </PrivateRoute>
                        <OrderStatus />

                    }
                />
                <Route
                    path="/category/:categoryID"
                    element={
                        // <PrivateRoute roles={['customer']}>
                        //     <CategoryItem />
                        // </PrivateRoute>
                        <CategoryItem />
                    }
                />
                <Route
                    path="/infor"
                    element={
                        <PrivateRoute roles={['customer']}>
                            <DetailUserInfor />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/products/:productID"
                    element={
                        <DetailProduct />
                    }
                />
                <Route
                    path="/cart"
                    element={
                        // <PrivateRoute roles={['customer']}>
                        //     <ShoppingCart />
                        // </PrivateRoute>
                        <ShoppingCart />
                    }
                />

                <Route
                    path="/checkout-success"
                    element={
                        // <PrivateRoute roles={['customer']}>
                        //     <ConfirmCheckout />
                        // </PrivateRoute>
                        <ConfirmCheckout />
                    }
                />

                {/* Employee and Manage */}
                <Route
                    path="/managehome"
                    element={
                        <PrivateRoute roles={['employee', 'manager']}>
                            <HomeManage />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Navigate to="products" replace />} />
                    <Route
                        path="dashboard"
                        element={
                            <PrivateRoute roles={['manager']}>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="chat"
                        element={
                            <PrivateRoute roles={['employee']}>
                                <Chatboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <PrivateRoute roles={['manager']}>
                                <Users />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="products"
                        element={
                            <PrivateRoute roles={['employee', 'manager']}>
                                <Products />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="managestatusproduct"
                        element={
                            <PrivateRoute roles={['manager', 'employee']}>
                                <ManageStatusProduct />
                            </PrivateRoute>
                        }
                    />
                </Route>
            </Routes>
        </div>
    );
}

export default AppRouters;
