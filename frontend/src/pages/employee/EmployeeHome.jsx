import { Box } from '@mui/material';
import SellerSidebar from '../../components/employee/SellerSidebar';
import Profile from '../../components/Profile';
import './home.css'
import { Outlet } from 'react-router-dom';

function EmployeeHome() {
  return (
    <div className='sellerPage'>
      <div className='header'>
        <Box sx={{ marginLeft: '100px', display: 'flex', alignItems: 'center' }}>
          <a
            href={"/"}
            className="font-extrabold text-2xl ml-16 p-3  hover:bg-white  hover:text-black max-lg:ml-3"
          >
            TECH MART
          </a>
        </Box>
        <Box sx={{ marginLeft: 'auto', marginRight: '100px', display: 'flex', alignItems: 'center' }}>
          <Profile />
        </Box>
      </div>
      <div className='main'>
        <div className='sidebar'>
          <SellerSidebar/>
        </div>
        <div className='content'>
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default EmployeeHome;