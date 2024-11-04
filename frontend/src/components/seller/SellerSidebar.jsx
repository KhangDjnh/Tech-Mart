import React from 'react';
import Sidebar from '../common/Sidebar';

function SellerSidebar({ onSelect }) {
  const sellerMenuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'My Products' },
    { id: 'orders', label: 'Orders' },
    { id: 'settings', label: 'Settings' },
  ];

  return <Sidebar menuItems={sellerMenuItems} onSelect={onSelect} />;
}

export default SellerSidebar;
