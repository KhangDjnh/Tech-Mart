import React from 'react';
import Sidebar from '../common/Sidebar/Sidebar';

function SellerSidebar({}) {
  const sellerMenuItems = [
    { id: 'products', label: 'Quản Lý Sản Phẩm', subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm', 'Cài đặt Sản Phẩm', 'Sản Phẩm Vi Phạm']},
    { id: 'orders', label: 'Quản Lý Đơn Hàng', subItems: ['Tất cả', 'Đơn hủy', 'Trả hàng/Hoàn tiền'] }
  ];

  return <Sidebar menuItems={sellerMenuItems} />;
}

export default SellerSidebar;
