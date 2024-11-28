//Card
import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();
  const handleProductClick = () => {
    window.location.href = `/product/${product.id}`;//`/product/${product.name}`
  };

  const handleOrderClick = () => {
    window.location.href = `/order/${product.id}`;
  };

  return (
    <div className="w-[240px] h-[450px] bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 py-2">
      <div
        className="relative overflow-hidden rounded-md cursor-pointer m-0"
        onClick={handleProductClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          - {product.discount}%
        </div>
      </div>

      <div className="mt-4">
        <h3
          className="text-lg font-medium cursor-pointer hover:text-blue-600 transition-colors duration-300 text-center m-0"
          onClick={handleProductClick}
        >
          {product.name}
        </h3>
        <div className="mt-2 text-red-600 font-semibold text-xl text-center">
          {product.discountPrice}đ
        </div>
        <div className="text-gray-500 line-through text-center">{product.originalPrice}đ</div>
      </div>

      <div className="flex justify-center mt-4 mb-2 m-0">
        <button
          onClick={handleOrderClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
        >
          MUA HÀNG
        </button>
      </div>
    </div>
  );
}

export default Card;
