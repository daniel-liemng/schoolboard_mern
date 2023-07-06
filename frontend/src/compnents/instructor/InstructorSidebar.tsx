import { useState } from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { instructorNav } from '../../data/data';

const InstructorSidebar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const [active, setActive] = useState(pathname);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        overflowX: 'hidden',
        height: '100vh',
        mt: '5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DashboardIcon fontSize='large' />
        <Box>
          <Typography variant='h6'>Dashboard</Typography>
          <Typography variant='subtitle2' align='center' sx={{ color: 'grey' }}>
            Instructor
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ width: '200px', mt: '1rem' }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {instructorNav?.map((item) => {
          const isActive = active.includes(item.link);
          const isDark = theme.palette.mode === 'dark';
          return (
            <Link to={item.link} key={item.name}>
              <Box
                onClick={() => setActive(item.link)}
                sx={{
                  padding: '1rem',
                  textTransform: 'uppercase',
                  textUnderlineOffset: '5px',
                  fontWeight: isActive ? 'bold' : 'medium',
                  fontSize: isActive ? '1rem' : '',
                  textDecoration: isActive ? 'underline' : '',
                  color:
                    isActive && !isDark
                      ? '#2196f3'
                      : isActive && isDark
                      ? '#3ded97'
                      : '',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  {item.icon}
                  {item.name}
                </Box>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default InstructorSidebar;
