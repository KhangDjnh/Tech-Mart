import React, { useState, useEffect, useCallback } from 'react';
import { productApi } from "../../api/productApi.js";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber.js";

function OrderProductChild({ products }) {
    const [fullProductDetails, setFullProductDetails] = useState([]);

    const getFullProductDetails = useCallback(async (products) => {
        try {
            const productDetailsPromises = products.map(async (product) => {
                const details = await productApi.getProductById(product.id);
                return {
                    ...details.data.data,
                    quantity: product.quantity,
                };
            });

            const details = await Promise.all(productDetailsPromises);
            setFullProductDetails(details);
        } catch (error) {
            console.error("Failed to fetch product details", error);
        }
    }, []);

    useEffect(() => {
        getFullProductDetails(products);
    }, [products, getFullProductDetails]);

    return (
        <div className={'bg-white mt-4'}>
            <div className="grid py-2 grid-cols-[auto,20%,20%] w-full place-items-center border-b-[1px] border-gray-400 bg-white">
                <p>Sản phẩm</p>
                <p>Giá</p>
                <p>Số lượng</p>
            </div>
            {fullProductDetails.map((e, i) => {
                return (
                    <div key={i} className="grid py-4 grid-cols-[auto,20%,20%] w-full place-items-center">
                        <Link to={`/products/${e._id}`} className="flex items-center w-full pl-2">
                            <img src={e.images[0]} alt="" className="bg-cover bg-no-repeat bg-center w-20 h-20 mr-4" />
                            <p className="!line-clamp-2">{e.name}</p>
                        </Link>
                        <p>{formatNumber(e.price)}đ</p>
                        <div>{e.quantity}</div>
                    </div>
                );
            })}
        </div>
    );
}

export default OrderProductChild;
