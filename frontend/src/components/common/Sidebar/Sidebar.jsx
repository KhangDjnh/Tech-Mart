import SidebarItem from '../SidebarItem/SidebarItem';
import "./Sidebar.css"

function Sidebar({ sidebarItems}) {
  return (
    <div className='sidebar'>
      <ul className='sidebar-list'>
        {sidebarItems.map((item, index) => (
          (<div key={index}><SidebarItem item={item} /></div>)
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;