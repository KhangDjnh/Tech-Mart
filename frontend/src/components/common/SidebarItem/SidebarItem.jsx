import React, {useState} from 'react';
import "./SidebarItem.css"
function SidebarItem({item}){
    const [displayHidden, setDisplayHidden] = useState(false);
    return(
        <div>
            <li className='mainItem' key={item.id}
            onClick={(e) => {e.preventDefault(); setDisplayHidden(prev => !prev)}}>
                {item.label}
            </li>
            {displayHidden && (<ul className='subMenu'>
                {item.subItems.map((item, index) => (<li className="subItem" key={index}>{item}</li>))}
            </ul>)}
        </div>
    )
}

export default SidebarItem;
