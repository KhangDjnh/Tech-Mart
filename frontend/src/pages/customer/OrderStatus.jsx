import React, { useEffect, useState, useCallback } from 'react';
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { Button } from "@mui/material";
import { orderApi } from "../../../api/orderApi.js";
import OrderProductChild from "../../components/OrderProductChild.jsx";
import {formatNumber} from "../../utils/formatNumber.js";

function OrderStatus() {
    const [orderProducts, setOrderProducts] = useState([]);
    const userID = JSON.parse(localStorage.getItem('session')).userDetails._id;

    const fetchOrders = useCallback(async () => {
        try {
            const res = await orderApi.getOrderByUserId(userID);
            setOrderProducts(res.data.data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        }
    }, [userID]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return (
        <div className="bg-gray-50">
            <div className="mx-20">
                <Navbar />
                <div className="mt-20">
                    <h1 className="font-bold text-xl uppercase py-6">
                        Danh sách đơn hàng của bạn
                    </h1>
                    <div>
                        {orderProducts.length !== 0 ? (
                            <div>
                                {orderProducts.map((order, index) => (
                                    <div key={index} className="border-[1px] border-black  mb-12 p-8">
                                        <div className="grid grid-cols-[80%,20%] gap-2 max-lg:grid-cols-[100%,0%] ">
                                            <div>
                                                <div className="flex items-center justify-between max-md:flex-col max-md:justify-start max-md:items-start">
                                                    <div>
                                                        <p className="font-bold text-lg">Order ID: {order._id}</p>
                                                        <p className="text-green-500">
                                                            Thanh
                                                            toán: {order.payment_status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                                                        </p>
                                                        <div
                                                            className={'flex justify-center items-center lg:hidden w-full'}>
                                                            {order.delivery_status === "delivered" ? (
                                                                <div className="flex items-center justify-center w-full">
                                                                    <div
                                                                        className={'text-green-400 font-bold w-full text-start'}>Giao
                                                                        hàng thành công
                                                                    </div>
                                                                </div>
                                                            ) : order.delivery_status === "pending" ?
                                                                <div className="flex items-center justify-center w-full">
                                                                    <div
                                                                        className={'text-yellow-400 font-bold w-full text-start'}>Đơn
                                                                        hàng đang giao
                                                                    </div>
                                                                </div> : <div className="flex items-center justify-center w-full">
                                                                    <div
                                                                        className={'text-red-400 font-bold w-full text-start'}> Trạng thái: Đơn
                                                                        hàng từ chối
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="bg-white p-4 rounded-xl ">
                                                        <p>Giao cho: {order.shipping?.name}</p>
                                                        <p>Số điện thoại: {order.shipping?.phone}</p>
                                                        <p>Địa chỉ: {order.shipping?.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'flex justify-center items-center max-lg:hidden'}>
                                                {order.delivery_status === "delivered" ? (
                                                    <div className="flex items-center justify-end">
                                                        <div className={'bg-green-300 p-4 rounded-full font-bold text-white'}>Giao
                                                            hàng thành công
                                                        </div>
                                                    </div>
                                                ) : order.delivery_status === "pending" ?
                                                    <div className="flex items-center justify-end">
                                                        <div className={'bg-yellow-300 p-4 rounded-full font-bold text-white'}>Đơn hàng đang giao</div>
                                                    </div> : <div className="flex items-center justify-end">
                                                        <div className={'bg-red-400 p-4 rounded-full font-bold text-white'}>Đơn hàng từ chối</div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <OrderProductChild products={order.products}/>
                                        <p className={'font-bold text-center mt-2 -mb-4 text-lg'}>Thành tiền: {formatNumber(order?.total)} đ</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-[300px] flex bg-white items-center justify-center font-medium text-2xl italic text-red-600">
                                Bạn chưa mua sản phẩm nào
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default OrderStatus;
