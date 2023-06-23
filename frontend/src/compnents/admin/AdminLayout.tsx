import { Box } from '@mui/material';
import React from 'react';
import AdminSidebar from './AdminSidebar';
import Navbar from '../Navbar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ height: '100%', minHeight: '100vh', paddingTop: '65px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            height: '100%',
            minHeight: '100vh',
          }}
        >
          <Box
            sx={{
              bgcolor: 'white',
              width: '200px',
              pt: '2rem',
              pl: '1rem',
            }}
          >
            <AdminSidebar />
          </Box>
          <Box sx={{ bgcolor: 'white', flex: '1', padding: '1rem' }}>
            {children}
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default AdminLayout;
