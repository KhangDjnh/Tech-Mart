import { useNavigate } from "react-router-dom";
import "./SidebarItem.css"

function SidebarItem({item, isActive, onClick} ){
    const navigate = useNavigate();
    return(
        <div>
            <li className={`sidebarItem-title ${isActive(item.id) ? "active" : ""}`} key={item.id}
            onClick={(e) => {e.preventDefault(); onClick(item.id); navigate(item.id)}}>
                { item.icon && <i className={item.icon}></i> }
                {item.label}
            </li>
        </div>
    )
}

export default SidebarItem;
