import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { adminNav } from '../../data/data';

const AdminSidebar = () => {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {adminNav?.map((item) => (
          <Link to={item.link} key={item.name}>
            <Box sx={{ backgroundColor: 'amber', padding: '1rem' }}>
              {item.name}
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default AdminSidebar;
