import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../common/Sidebar/Sidebar.css'

function SellerSidebar() {
  const role = JSON.parse(localStorage.getItem('session'))?.userDetails?.role;
  const [activeItemId, setActiveItemId] = useState(1);
  const isActive = id => activeItemId === id;
  const navigate = useNavigate();
  const sellerMenuItems = [
    { id: 'order', label: 'Đơn Hàng'},
    { id: 'product', label: 'Sản Phẩm'},
    { id: 'employee_manager', label: 'Nhân viên'}
  ];

  // return <Sidebar sidebarItems={sellerMenuItems} isActive={(id) => activeItemId === id} onClick={(id) => setActiveItemId(id)}/>;
  return(
    <div className='sidebar'>
      <ul className='sidebar-list'>
        {(role?.includes("employee") || role?.includes("manager")) &&
          <li className={`sidebarItem-title ${isActive(1) ? "active" : ""}`} key={1}
          onClick={(e) => {e.preventDefault(); setActiveItemId(1); navigate('product')}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 6.35 6.35" id="product">
              <path fill="#cecece" d="m 1.2932027,0.52839152 c -0.4191339,0 -0.76377769,0.346705 -0.76377769,0.76584398 v 3.761529 c 0,0.419132 0.34464379,0.765844 0.76377769,0.765844 h 3.7635945 c 0.4191339,0 0.7637778,-0.346712 0.7637778,-0.765844 v -3.761529 c 0,-0.41913898 -0.3446439,-0.76584398 -0.7637778,-0.76584398 z m 0,0.52968498 h 1.0877889 v 1.853116 c 0.00191,0.234304 0.2849452,0.350694 0.4511352,0.185517 l 0.344165,-0.341579 0.3415813,0.341579 c 0.1661901,0.165177 0.4492215,0.04879 0.4511353,-0.185517 v -1.853116 h 1.0877888 c 0.1331511,0 0.2346111,0.103011 0.2346111,0.236159 v 3.761529 c 0,0.133151 -0.10146,0.236678 -0.2346111,0.236678 H 1.2932027 c -0.133151,0 -0.2340943,-0.103527 -0.2340943,-0.236678 v -3.761529 c 0,-0.133148 0.1009433,-0.236159 0.2340943,-0.236159 z m 1.6169556,0 h 0.5296834 v 1.214395 l -0.078031,-0.07803 c -0.1032081,-0.102597 -0.2698956,-0.102597 -0.3731037,0 l -0.078548,0.07803 z"></path>
            </svg>
            <div style={{paddingTop: "5px"}}>
              Sản Phẩm
            </div>
          </li>
        }
        {role?.includes("manager") &&
          <li className={`sidebarItem-title ${isActive(2) ? "active" : ""}`} key={2}
          onClick={(e) => {e.preventDefault(); setActiveItemId(2); navigate('order')}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="24" height="24" id="receipt">
              <path fill="#cecece" d="M968.2 918.4c-42-26.5-83.9-53.1-125.9-79.6-5.9-3.7-11.8-7.5-17.7-11.2-14.6-9.2-35.9-9.2-50.5 0-42 26.5-83.9 53.1-125.9 79.6-5.9 3.7-11.8 7.5-17.7 11.2H681c-42-26.5-83.9-53.1-125.9-79.6-5.9-3.7-11.8-7.5-17.7-11.2-14.6-9.2-35.9-9.2-50.5 0-42 26.5-83.9 53.1-125.9 79.6-5.9 3.7-11.8 7.5-17.7 11.2h50.5c-42-26.5-83.9-53.1-125.9-79.6-5.9-3.7-11.8-7.5-17.7-11.2-14.6-9.2-35.9-9.2-50.5 0-42 26.5-83.9 53.1-125.9 79.6-5.9 3.7-11.8 7.5-17.7 11.2 25.1 14.4 50.2 28.8 75.2 43.2V133.3c0-3.5.2-7 .7-10.5-.6 4.4-1.2 8.9-1.8 13.3.9-6.2 2.6-12.2 5-17.9-1.7 4-3.4 8-5 11.9 2.5-5.6 5.6-10.8 9.3-15.7-2.6 3.4-5.2 6.7-7.8 10.1 3.5-4.4 7.5-8.4 11.9-11.9-3.4 2.6-6.7 5.2-10.1 7.8 4.9-3.7 10-6.8 15.7-9.3-4 1.7-8 3.4-11.9 5 5.8-2.4 11.7-4.1 17.9-5-4.4.6-8.9 1.2-13.3 1.8 8.9-1.1 18-.7 26.9-.7H872.8c3.4 0 6.9.2 10.3.7-4.4-.6-8.9-1.2-13.3-1.8 6.2.9 12.2 2.6 17.9 5-4-1.7-8-3.4-11.9-5 5.6 2.5 10.8 5.6 15.7 9.3-3.4-2.6-6.7-5.2-10.1-7.8 4.4 3.5 8.4 7.5 11.9 11.9-2.6-3.4-5.2-6.7-7.8-10.1 3.7 4.9 6.8 10 9.3 15.7-1.7-4-3.4-8-5-11.9 2.4 5.8 4.1 11.7 5 17.9-.6-4.4-1.2-8.9-1.8-13.3 1.2 9.7.7 19.8.7 29.6v775.1c0 10.9-.1 21.8 0 32.7v1.4c0 12.8 5.6 26.3 14.6 35.4 8.7 8.7 22.9 15.2 35.4 14.6 12.9-.6 26.3-4.8 35.4-14.6 9-9.8 14.6-21.8 14.6-35.4V132.7c-.2-27.1-9.2-52.3-25.7-73.6-23.4-30.3-59.1-46.5-97.2-46.5H154c-8.9 0-17.8 1.2-26.6 2.6-32.4 5.1-59 26.2-77 51.9C36.1 87.6 31 113 31 137.7V961.7c0 17.6 9.6 34.3 24.8 43.2 15 8.8 35.5 9.5 50.5 0 42-26.5 83.9-53.1 125.9-79.6 5.9-3.7 11.8-7.5 17.7-11.2h-50.5c42 26.5 83.9 53.1 125.9 79.6 5.9 3.7 11.8 7.5 17.7 11.2 14.6 9.2 35.9 9.2 50.5 0 42-26.5 83.9-53.1 125.9-79.6 5.9-3.7 11.8-7.5 17.7-11.2h-50.5c42 26.5 83.9 53.1 125.9 79.6 5.9 3.7 11.8 7.5 17.7 11.2 14.6 9.2 35.9 9.2 50.5 0 42-26.5 83.9-53.1 125.9-79.6 5.9-3.7 11.8-7.5 17.7-11.2h-50.5c42 26.5 83.9 53.1 125.9 79.6 5.9 3.7 11.8 7.5 17.7 11.2 10.7 6.8 26.4 8.4 38.5 5 11.6-3.2 24.2-12.2 29.9-23 13.4-24.7 6.1-53.5-17.6-68.5z"></path>
              <path fill="#cecece" d="M276.2 373.1h413.7c19 0 38.1.2 57.1 0h.8c12.8 0 26.3-5.6 35.4-14.6 8.7-8.7 15.2-22.9 14.6-35.4-.6-12.9-4.8-26.3-14.6-35.4-9.8-9-21.8-14.6-35.4-14.6H334.1c-19 0-38.1-.2-57.1 0h-.8c-12.8 0-26.3 5.6-35.4 14.6-8.7 8.7-15.2 22.9-14.6 35.4.6 12.9 4.8 26.3 14.6 35.4 9.8 8.9 21.8 14.6 35.4 14.6zm471.6 151.6H334.1c-19 0-38.1-.2-57.1 0h-.8c-12.8 0-26.3 5.6-35.4 14.6-8.7 8.7-15.2 22.9-14.6 35.4.6 12.9 4.8 26.3 14.6 35.4 9.8 9 21.8 14.6 35.4 14.6h413.7c19 0 38.1.2 57.1 0h.8c12.8 0 26.3-5.6 35.4-14.6 8.7-8.7 15.2-22.9 14.6-35.4-.6-12.9-4.8-26.3-14.6-35.4-9.8-9-21.8-14.6-35.4-14.6z"></path>
            </svg>
            <div style={{paddingTop: "5px"}}>
              Đơn Hàng
            </div>
          </li>
        }
        {role?.includes("manager") &&
          <li className={`sidebarItem-title ${isActive(3) ? "active" : ""}`} key={3}
          onClick={(e) => {e.preventDefault(); setActiveItemId(3); navigate('employee_manager')}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16" id="person">
              <path fill="#cecece" d="M11.5,8 C12.3284271,8 13,8.67157288 13,9.5 L13,10 C13,11.9714437 11.14049,14 8,14 C4.85950997,14 3,11.9714437 3,10 L3,9.5 C3,8.67157288 3.67157288,8 4.5,8 L11.5,8 Z M11.5,9 L4.5,9 C4.22385763,9 4,9.22385763 4,9.5 L4,10 C4,11.4376472 5.4321567,13 8,13 C10.5678433,13 12,11.4376472 12,10 L12,9.5 C12,9.22385763 11.7761424,9 11.5,9 Z M8,1.5 C9.51878306,1.5 10.75,2.73121694 10.75,4.25 C10.75,5.76878306 9.51878306,7 8,7 C6.48121694,7 5.25,5.76878306 5.25,4.25 C5.25,2.73121694 6.48121694,1.5 8,1.5 Z M8,2.5 C7.03350169,2.5 6.25,3.28350169 6.25,4.25 C6.25,5.21649831 7.03350169,6 8,6 C8.96649831,6 9.75,5.21649831 9.75,4.25 C9.75,3.28350169 8.96649831,2.5 8,2.5 Z"></path>
            </svg>
            <div style={{paddingTop: "5px"}}>
              Nhân Viên
            </div>
          </li>
        }
      </ul>
    </div>
  )
}

export default SellerSidebar;
