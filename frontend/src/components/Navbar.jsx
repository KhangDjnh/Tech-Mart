import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Search from './Search';
import Logo from './Logo';
import Profile from './Profile';
import MenuListComposition from './MenuList';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          zIndex: 1201,
        }}
      >
          <Toolbar>
            <Box sx={{
              maxWidth: "1200px", 
              margin: "0 auto",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}>
              <Logo />
              <Box sx={{ flexGrow: 1, mx: 2 }}>
                <Search />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <MenuListComposition
                  buttonLabel="Laptop"
                  menuItems={['MacBook', 'Dell', 'Lenovo', 'Asus']}
                />
                <MenuListComposition
                  buttonLabel="Smartphone"
                  menuItems={['iPhone', 'Samsung', 'Xiaomi', 'OnePlus']}
                />
                <MenuListComposition
                  buttonLabel="Television"
                  menuItems={['Samsung', 'LG', 'Sony', 'Panasonic']}
                />
                <MenuListComposition
                  buttonLabel="Tablet"
                  menuItems={['iPad', 'Samsung Galaxy Tab', 'Lenovo Tab']}
                />
              </Box>
              <Box sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                <ShoppingCartIcon />
              </Box>
              <Box sx={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                <Profile />
              </Box>
            </Box>
          </Toolbar>
      </AppBar>
    </Box>
  );
}
