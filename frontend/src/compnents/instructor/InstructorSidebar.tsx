import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { instructorNav } from '../../data/data';

const InstructorSidebar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {instructorNav?.map((item) => (
        <Link to={item.link} key={item.name}>
          <Box sx={{ backgroundColor: 'amber', padding: '1rem' }}>
            {item.name}
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default InstructorSidebar;
