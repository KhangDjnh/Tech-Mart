import { Box } from '@mui/material';
import SellerSidebar from '../../components/employee/SellerSidebar';
import Profile from '../../components/Profile';
import './home.css'
import Logo from '../../components/Logo';
import { Outlet } from 'react-router-dom';

function EmployeeHome() {
  return (
    <div className='sellerPage'>
      <div className='header'>
        <Box sx={{ marginLeft: '100px', display: 'flex', alignItems: 'center' }}>
          <Logo/>
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