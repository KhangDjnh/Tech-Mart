import React from 'react';

function Sidebar({ menuItems, onSelect }) {
  return (
    <aside style={{ width: '20%', backgroundColor: '#f0f0f0', padding: '1rem' }}>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {menuItems.map((item) => (
          <li
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{ cursor: 'pointer', margin: '1rem 0' }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;