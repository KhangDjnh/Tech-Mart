import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const fetchData = async () => {
    try{
      const res = await orderApi.getAllOrder();
      setOrders(res.data.data);
    }catch(e){
      console.error('Error fetching product data:', e);
    }
  }

  useEffect(() => {
    try{
      if(localStorage.getItem("token")){
      }else{
        navigate("/login");
      }
    }catch (e){
      console.log(e);
    }
    fetchData();
  }, []);

  return(
    <div style={{display: "flex", flexDirection: "row"}}>
      <div className="halfPage">
        <div className="headerInOrderManager">
          Danh Sách Đơn Hàng
        </div>
        <ul className="orderList">
          {orders.slice().reverse().map((order) => (<OrderCard key={order._id} order={order} setShowUserInfo={setUserInfo} isOrderOpen={isOderOpen} setIsOrderOpen={setIsOrderOpen}/>))}
        </ul>
      </div>
      <div className="halfPage" style={{paddingLeft: "10px", width: "42%", flex: "1", position: "fixed", right: "16px"}}>
        <div>
          <div className="headerInOrderManager">
            Thông Tin Khách Hàng
          </div>
          {userInfo && (<div className="customerInfoBlock">
            <table>
              <tbody>
                <tr>
                  <th style={{paddingBottom: "10px"}}>Tên tài khoản: </th>
                  <td style={{paddingBottom: "10px"}}>{userInfo.username}</td>
                </tr>
                <tr>
                  <th><PersonIcon /> Họ và tên: </th>
                  <td>{userInfo.fullname}</td>
                </tr>
                <tr>
                  <th><PhoneIcon /> Số điện thoại: </th>
                  <td>{userInfo.phonenumber}</td>
                </tr>
                <tr>
                  <th><HomeIcon /> Địa chỉ: </th>
                  {
                    userInfo.currentAddress ? 
                      <td>{userInfo.currentAddress}</td>
                    :
                      <td>
                        {userInfo.orderAddress.line2} -&nbsp;
                        {userInfo.orderAddress.line1} -&nbsp;
                        {userInfo.orderAddress.city} -&nbsp;
                        {userInfo.orderAddress.country}
                      </td>
                  }
                </tr>
              </tbody>
            </table>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default OrderManager;