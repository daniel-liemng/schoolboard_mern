import { Box, useTheme } from '@mui/material';
import React from 'react';
import Navbar from '../Navbar';
import InstructorSidebar from './InstructorSidebar';
import { grey } from '@mui/material/colors';

interface InstructorLayoutProps {
  children: React.ReactNode;
}

const InstructorLayout: React.FC<InstructorLayoutProps> = ({ children }) => {
  const theme = useTheme();

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
              minWidth: '200px',
              pt: '2rem',
              pl: '1rem',
              backgroundColor:
                theme.palette.mode === 'dark' ? grey[600] : grey[100],
            }}
          >
            <InstructorSidebar />
          </Box>
          <Box
            sx={{
              bgcolor: 'white',
              flex: '1',
              padding: '1rem',
              backgroundColor:
                theme.palette.mode === 'dark' ? grey[600] : grey[100],
            }}
          >
            {children}
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default InstructorLayout;
