import './OrderManager.css';

function OrderList(){
  return(
    <div style={{display: "flex", flexDirection: "row"}}>
      <div className="halfPage" style={{paddingRight: "10px", width: "50%"}}>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="headerInOrderManager">
          Danh sách đơn hàng
        </div>
        <div className="">

        </div>
      </div>
      <div className="halfPage" style={{paddingLeft: "10px", width: "35%", flex: "1",
                                        position: "fixed", right: "16px"}}>
        <div className="customerInfoBlock">
          <div className="headerInOrderManager">
            Thông tin khách hàng
          </div>
        </div>
        <div className="paymentInfoBlock">
          <div className="headerInOrderManager">
            Phương thức thanh toán
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList;