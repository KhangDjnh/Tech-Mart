import { useState } from 'react';
import './OrderManager.css';
import OrderCard from './OrderCard';

function OrderManager(){
  const [showUserInfo, setShowUserInfo] = useState(null);
  const [isOderOpen, setIsOrderOpen] = useState(null);
  // change this
  const product1 = {
    name: "Laptop xyz", price: "1.000", images: ["url"]
  };
  const product2 = {
    name: "smartphone xyz", price: "500", images: ["url"]
  };
  const orders = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    user: 
      {username: "name",
       phonenumber: "123456789",
       address: "asd, jkl, 123",
       id: index + 1
      },
    products: [product1, product2],
    total_price: 1.000,
    status: "complete",
    address: "abc, xyz, 123"
  }));

  return(
    <div style={{display: "flex", flexDirection: "row"}}>
      <div className="halfPage" style={{paddingRight: "10px", width: "50%"}}>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <ul className="orderList">
          {orders.map((order) => (<OrderCard key={order.id} order={order} setShowUserInfo={setShowUserInfo} isOrderOpen={isOderOpen} setIsOrderOpen={setIsOrderOpen}/>))}
        </ul>
      </div>
      {showUserInfo && (<div className="halfPage" style={{paddingLeft: "10px", width: "35%", flex: "1",
                                        position: "fixed", right: "16px"}}>
        <div>
          <div className="headerInOrderManager">
            Thông tin khách hàng
          </div>
          <div className="customerInfoBlock">
            Tên tài khoản: {showUserInfo.username} <br/>
            Số điện thoại: {showUserInfo.phonenumber} <br/>
            Địa chỉ: {showUserInfo.address} <br/>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default OrderManager;