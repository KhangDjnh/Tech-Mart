import { useState, useEffect } from 'react';
import './OrderManager.css';
import OrderCard from './OrderCard';
import { orderApi } from '../../../../api/orderApi';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

function OrderManager(){
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isOderOpen, setIsOrderOpen] = useState(null);

  const fetchData = async () => {
    try{
      const res = await orderApi.getAllOrder();
      setOrders(res.data.data);
    }catch(e){
      console.error('Error fetching product data:', e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <div style={{display: "flex", flexDirection: "row"}}>
      <div className="halfPage" style={{paddingRight: "10px", width: "50%"}}>
        <div className="headerInOrderManager">
          Danh Sách Đơn Hàng
        </div>
        <ul className="orderList">
          {orders.slice().reverse().map((order) => (<OrderCard key={order._id} order={order} setShowUserInfo={setUserInfo} isOrderOpen={isOderOpen} setIsOrderOpen={setIsOrderOpen}/>))}
        </ul>
      </div>
      {userInfo && (<div className="halfPage" style={{paddingLeft: "10px", width: "35%", flex: "1",
                                        position: "fixed", right: "16px"}}>
        <div>
          <div className="headerInOrderManager">
            Thông Tin Khách Hàng
          </div>
          <div className="customerInfoBlock">
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <tbody>
                <tr>
                  <th style={{width: "150px", padding: "2px 0"}}><PersonIcon /> Tên tài khoản: </th>
                  <td>{userInfo.username}</td>
                </tr>
                <tr>
                  <th style={{width: "150px", padding: "2px 0"}}><PhoneIcon /> Số điện thoại: </th>
                  <td>{userInfo.phonenumber}</td>
                </tr>
                <tr>
                  <th style={{width: "150px", padding: "2px 0"}}><HomeIcon /> Địa chỉ: </th>
                  <td>{userInfo.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default OrderManager;