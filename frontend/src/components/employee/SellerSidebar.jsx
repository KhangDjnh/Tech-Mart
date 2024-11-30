import React from 'react';
import Sidebar from '../common/Sidebar/Sidebar';

function SellerSidebar({}) {
  const sellerMenuItems = [
    { id: 'order', dropIcon: 'bi-chevron-down toggle-btn', label: 'Đơn Hàng', 
      subItems: ['Tất cả', 'Đơn hủy', 'Trả hàng/Hoàn tiền'],
      routes: ['/seller', '/seller', '/seller']},
    { id: 'product', dropIcon: 'bi-chevron-down toggle-btn', label: 'Sản Phẩm', 
      subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm', 'Sản Phẩm Vi Phạm'],
      routes: ['/seller', '/seller', '/seller']}
  ];

  return <Sidebar sidebarItems={sellerMenuItems} />;
}

export default SellerSidebar;
