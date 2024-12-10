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
      const productWrappers = order.products;
      const productPromises = productWrappers.map((productWrapper) => productApi.getProductById(productWrapper.id));
      const productWrapper = await Promise.all(productPromises);
      const res = productWrapper.map(element => element.data.data);
      setProduct(res);
      const quantityArray = productWrappers.map((productWrapper) => productWrapper.quantity);
      setQuantities(quantityArray);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchUserData = async () => {
    try {
      const res = await userApi.getUserById(order.userId);
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
        const userObj = {
          username: user.username,
          phonenumber: user.phonenumber,
          fullname: order.shipping.name,
          orederAddress: {
            country: order.shipping.address.country,
            city: order.shipping.address.city,
            line1: order.shipping.address.line1,
            line2: order.shipping.address.line2
          },
          currentAddress: user.address
        };
        setShowUserInfo(userObj);
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
        <table>
          <tbody>
            <tr>
              <th>Đơn:</th>
              <td>{order._id}</td>
            </tr>
            <tr>
              <th>Tổng giá:</th>
              <td>{formatNumber(order.subtotal)}đ</td>
            </tr>
            <tr>
              <th>Thanh toán:</th>
              <td>{formatStatus(order.payment_status)}</td>
            </tr>
            <tr>
              <th>Vận chuyển:</th>
              <td>{formatStatus(order.delivery_status)}</td>
            </tr>
            <tr>
              <th>Nơi nhận hàng:</th>
              <td>{order.shipping.address.line2} -&nbsp;
                {order.shipping.address.line1} -&nbsp;
                {order.shipping.address.city} -&nbsp;
                {order.shipping.address.country}
              </td>
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