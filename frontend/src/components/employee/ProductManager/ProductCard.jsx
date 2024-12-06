
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";
import { formatNumber } from "../../../utils/formatNumber.js";


function ProductCard({ product, callback }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/employee/product/${product._id}`);
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex flex-col w-[200px] h-[450px] bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 py-2">
        <div
          className="justify-center items-center relative w-full overflow-hidden rounded-md cursor-pointer m-0"
          onClick={handleEditClick}
          style={{height: "200px"}}
        >
          <img
            src={product.images[0]}
            alt="Không thể tải ảnh"
            className="w-full h-full transition-transform duration-300 hover:scale-102"
            style={{objectFit: "contain"}}
          />
        </div>

        <div className="flex justify-center items-center px-4 mt-4" style={{height: "84px"}}>
          <h3
            className="text-lg text-black font-medium cursor-pointer hover:text-blue-600 transition-colors duration-300 text-center m-0"
            onClick={handleEditClick}
          >
            {product.name}
          </h3>
        </div>
        <div className="flex justify-center"
          style={{marginTop: "auto"}}>
          Còn lại:&nbsp;<span className="text-black">{product.stock}</span>&nbsp;trong kho
        </div>
        <div className="flex justify-center"
          style={{alignItems: "center", height: "60px"}}>
          {
            product.discount ?
            <div>
              <div className="text-center">
                <span className="text-md line-through p-1">
                {formatNumber(product.realprice)}đ
                </span>
                <span className="text-sm text-white bg-red-500 rounded-md p-1">
                  - {product.discount}%
                </span>
              </div>
              <div className="text-lg text-center text-black font-medium">
                {formatNumber(product.price)}đ
              </div>
            </div>
            :
            <div className="text-lg text-center text-black font-medium">
              {formatNumber(product.realprice)}đ
            </div>
          }
        </div>

        <div className="flex justify-center mb-2 mt-1">
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
        <DeleteWarning product={product} showModal={showModal} setShowModal={setShowModal} callback={callback}/>
      </div>
    </div>
  );
}

export default ProductCard;
