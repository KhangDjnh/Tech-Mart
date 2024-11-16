import React, {useState} from 'react';
import "./SidebarItem.css"

function SidebarItem({item}){
    const [displayHidden, setDisplayHidden] = useState(false);
    const [expanded, setExpanded] = useState(false)
    return(
        <div>
            <li className={expanded ? 'sidebarItem-title expanded' : 'sidebarItem-title'} key={item.id}
            onClick={(e) => {e.preventDefault(); setDisplayHidden(prev => !prev); setExpanded(!expanded);}}>
                { item.icon && <i className={item.icon}></i> }
                {item.label}
                { item.dropIcon && <i className={item.dropIcon}></i> }
            </li>
            {displayHidden && item.subItems && (<ul className='sidebarItem-subMenu'>
                {item.subItems.map((item, index) => (<li className="sidebarItem-subItem" key={index}>{item}</li>))}
            </ul>)}
        </div>
    )
}

export default SidebarItem;
