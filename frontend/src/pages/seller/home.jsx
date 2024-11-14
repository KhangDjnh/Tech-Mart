import React, { useState } from 'react';
import SellerSidebar from '../../components/seller/SellerSidebar';
function SellerHome() {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const handleSelectTab = (tabId) => {
    setSelectedTab(tabId); // Update the selected tab state
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ display: 'flex', flex: 1 }}>
        <SellerSidebar onSelect={handleSelectTab} />
      </div>
    </div>
  );
}

export default SellerHome;