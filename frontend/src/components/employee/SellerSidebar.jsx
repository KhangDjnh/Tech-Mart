import {useState} from 'react';
import Sidebar from '../common/Sidebar/Sidebar';

function SellerSidebar() {
  const [activeItemId, setActiveItemId] = useState(null);
  const sellerMenuItems = [
    { id: 'order', label: 'Đơn Hàng'},
    { id: 'product', label: 'Sản Phẩm'},
  ];

  return <Sidebar sidebarItems={sellerMenuItems} isActive={(id) => activeItemId === id} onClick={(id) => setActiveItemId(id)}/>;
}

export default SellerSidebar;
