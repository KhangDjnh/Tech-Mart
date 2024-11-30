import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./SidebarItem.css"

function SidebarItem({item}){
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false)

    return(
        <div>
            <li className={expanded ? 'sidebarItem-title expanded' : 'sidebarItem-title'} key={item.id}
            onClick={(e) => {e.preventDefault(); setExpanded(prev => !prev);}}>
                { item.icon && <i className={item.icon}></i> }
                {item.label}
                { item.dropIcon && <i className={item.dropIcon}></i> }
            </li>
            {expanded && item.subItems && (<ul className='sidebarItem-subMenu'>
                {item.subItems.map((subItem, index) => 
                    (<li className="sidebarItem-subItem" key={index} onClick={(e) => {e.preventDefault(); navigate(item.routes[index]);}}>{subItem}</li>))}
            </ul>)}
        </div>
    )
}

export default SidebarItem;
