import { useState, useEffect } from "react";
import './OrderManager.css';
import { formatNumber } from "../../../utils/formatNumber.js";
import { productApi } from "../../../../api/productApi";
import { userApi } from "../../../../api/userApi.js";
import { formatStatus } from "../../../utils/formatOrderStatus.js";


function OrderCard({order, setShowUserInfo, isOrderOpen, setIsOrderOpen}){
  const [showInfo, setShowInfo] = useState(false);
  const [products, setProduct] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [user, setUser] = useState({})
  const [flag, setFlag] = useState(1);

  const fetchProductData = async () => {
    try {
      const productIds = order.id_product;
      const productPromises = productIds.map((productWrapper) => productApi.getProductById(productWrapper.product));
      const productWrapper = await Promise.all(productPromises);
      const res = productWrapper.map(element => element.data.data);
      setProduct(res);
      const quantityArray = productIds.map((productWrapper) => productWrapper.quantity);
      setQuantities(quantityArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchUserData = async () => {
    try {
      const res = await userApi.getUserById(order.id_user);
      setUser(res.data.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }
  useEffect(() => {
    fetchProductData();
    fetchUserData();
  },[]);

  useEffect(() => {
    if(isOrderOpen === order._id) {
      if(!showInfo) {
        setShowUserInfo(user);
      } else setShowUserInfo(null);
      setShowInfo(prev => !prev);
    }else {
      setShowInfo(false);
    }
  }, [isOrderOpen, flag]);

  const handleOnClick = () => {
    setIsOrderOpen(order._id);
    setFlag(prev => prev*(-1));
  }

  useEffect(() =>{
    console.log("Update user in order: ", user);
  },[user])

  return(
    <div>
      <div className={showInfo ? "orderInfo expanded" : "orderInfo"} onClick={handleOnClick}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <tbody>
            <tr>
              <th style={{width: "130px"}}>Đơn:</th>
              <td>{order._id}</td>
            </tr>
            <tr>
              <th style={{width: "130px"}}>Tổng giá:</th>
              <td>{formatNumber(order.total_price)}đ</td>
            </tr>
            <tr>
              <th style={{width: "130px"}}>Trạng thái:</th>
              <td>{formatStatus(order.status)}</td>
            </tr>
            <tr>
              <th style={{width: "130px"}}>Nơi nhận hàng:</th>
              <td>{order.address}</td>
            </tr>
          </tbody>
        </table>
        <i className="bi-chevron-down toggle-btn" />
      </div>
      {showInfo && (<ul>
        {products.map((product, index) => (<li className="productInOrder" key={index}>
          <div style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <img src={product.images[0]} style={{width: "100px", objectFit: "contain"}}/>
            <table style={{ width: "100%", borderCollapse: "collapse", marginLeft:"20px", textAlign: "left"}}>
              <tbody>
                <tr>
                  <th>Sản phẩm:</th>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <th>Giá:</th>
                  <td>{formatNumber(product.price)}đ</td>
                </tr>
                <tr>
                  <th>Số lượng:</th>
                  <td>{quantities[index]}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>))}
      </ul>)}
    </div>
  )
}

export default OrderCard;