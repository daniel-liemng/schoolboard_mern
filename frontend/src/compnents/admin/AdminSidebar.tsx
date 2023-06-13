import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { adminNav } from '../../data/data';

const AdminSidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {adminNav?.map((item) => (
        <Link to={item.link} key={item.name}>
          <Box sx={{ backgroundColor: 'amber', padding: '1rem' }}>
            {item.name}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default AdminSidebar;
