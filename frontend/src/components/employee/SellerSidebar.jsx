import React from 'react';
import Sidebar from '../common/Sidebar/Sidebar';

function SellerSidebar({}) {
  const sellerMenuItems = [
    { id: 'products', dropIcon: 'bi-chevron-down toggle-btn', label: 'Quản Lý Sản Phẩm', 
      subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm', 'Cài Đặt Sản Phẩm', 'Sản Phẩm Vi Phạm']},
    { id: 'orders', dropIcon: 'bi-chevron-down toggle-btn', label: 'Quản Lý Đơn Hàng', 
      subItems: ['Tất cả', 'Đơn hủy', 'Trả hàng/Hoàn tiền'] },
    { id: '1', dropIcon: 'bi-chevron-down toggle-btn', label: 'Quản Lý Sản Phẩm', 
      subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm', 'Cài đặt Sản Phẩm', 'Sản Phẩm Vi Phạm']},
    { id: '2', dropIcon: 'bi-chevron-down toggle-btn', label: 'Quản Lý Sản Phẩm', 
      subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm', 'Cài đặt Sản Phẩm', 'Sản Phẩm Vi Phạm']},
    { id: '3', dropIcon: 'bi-chevron-down toggle-btn', label: 'Quản Lý Sản Phẩm', 
      subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm', 'Cài đặt Sản Phẩm', 'Sản Phẩm Vi Phạm']},
    { id: '4', dropIcon: 'bi-chevron-down toggle-btn', label: 'Quản Lý Sản Phẩm', 
      subItems: ['Tất Cả Sản Phẩm', 'Thêm Sản Phẩm', 'Cài đặt Sản Phẩm', 'Sản Phẩm Vi Phạm']}
  ];

  return <Sidebar sidebarItems={sellerMenuItems} />;
}

export default SellerSidebar;
