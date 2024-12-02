
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";


function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/employee/product/${product.id}`);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className="w-[240px] h-[450px] bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 py-2">
        <div
          className="relative overflow-hidden rounded-md cursor-pointer m-0"
          onClick={handleEditClick}
        >
          <img
            src={product.image}
            alt="Không thể tải ảnh"
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>

        <div className="mt-4">
          <h3
            className="text-lg font-medium cursor-pointer hover:text-blue-600 transition-colors duration-300 text-center m-0"
            onClick={handleEditClick}
          >
            {product.name}
          </h3>
          <div className="text-black-600 text-center">{product.originalPrice}đ</div>
        </div>

        <div className="flex justify-center mt-4 mb-2 m-0">
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
            style={{margin: "0 10px"}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="edit">
              <path fill="#000" d="M17.864 3.6a1 1 0 0 0-1.414 0l-1.414 1.415 4.242 4.242 1.414-1.414a1 1 0 0 0 0-1.414L17.864 3.6zm0 7.072-4.243-4.243-8.9 8.9a1 1 0 0 0-.292.706v2.829a1 1 0 0 0 1 1h2.828a1 1 0 0 0 .707-.293l8.9-8.9z"></path>
            </svg>
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors duration-300"
            style={{margin: "0 10px"}}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="delete">
              <path fill="#000" d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"></path>
              <path fill="#000" d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <DeleteWarning product={product} showModal={showModal} setShowModal={setShowModal}/>
      </div>
    </div>
  );
}

export default ProductCard;
