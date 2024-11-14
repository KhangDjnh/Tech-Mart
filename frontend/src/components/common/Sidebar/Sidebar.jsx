import SidebarItem from '../SidebarItem/SidebarItem';
import "./Sidebar.css"
function Sidebar({ menuItems}) {
  return (
    <div className='sidebar'>
      <ul>
        {menuItems.map((item, index) => (
          (<div key={index}><SidebarItem item={item} /></div>)
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;