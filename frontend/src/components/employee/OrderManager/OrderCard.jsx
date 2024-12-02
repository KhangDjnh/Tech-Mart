import { useState, useEffect } from "react";
import './OrderManager.css';


function OrderCard({order, setShowUserInfo, isOrderOpen, setIsOrderOpen}){
  const [showInfo, setShowInfo] = useState(false);
  const [flag, setFlag] = useState(1);

  useEffect(() => {
    if(isOrderOpen === order.id) {
      if(!showInfo) {
        setShowUserInfo(order.user);
      } else setShowUserInfo(null);
      setShowInfo(prev => !prev);
    }else {
      setShowInfo(false);
    }
  }, [isOrderOpen, flag]);

  const handleOnClick = () => {
    setIsOrderOpen(order.id);
    setFlag(prev => prev*(-1));
  }

  return(
    <div>
      <div className={showInfo ? "orderInfo expanded" : "orderInfo"} onClick={handleOnClick}>
        <div style={{display: "flex", flexDirection:"column", marginRight: "auto", width: "100%"}}>
          <div style={{display: "flex",flexDirection: "row"}}>
            <div style={{width: "20%"}}>
              Đơn: {order.id}
            </div>
            <div style={{width: "35%"}}>
              Tổng giá: {order.total_price}đ
            </div>
            <div style={{width: "40%"}}>
              Trạng thái: {order.status}
            </div>
          </div>
          <span>
            Nơi nhận hàng: {order.address}
          </span>
        </div>
        <i className="bi-chevron-down toggle-btn" />
      </div>
      {showInfo && (<ul>
        {order.products.map((product, index) => (<li className="productInOrder" key={index}>
          <div  style={{display: "flex", flexDirection: "row", width: "100%"}}>
            <img src={product.images[0]} style={{width: "30%"}}/>
            <div style={{display: "flex", flexDirection: "column", width: "70%", padding: "10px"}}>
              <scan>{`Tên sản phẩm: ${product.name}`}</scan>
              Giá: {product.price}đ
            </div>
          </div>
        </li>))}
      </ul>)}
    </div>
  )
}

export default OrderCard;