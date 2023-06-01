import { Box, Button, Typography } from '@mui/material';
import bgImg from '../assets/school.jpg';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          background: '#2F5596',
          '&::before': {
            position: 'absolute',
            display: 'block',
            // transform: 'translateX(-50%)',
            // left: '50%',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            content: "''",
          },
        }}
      >
        <img
          src={bgImg}
          alt='image'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
            textAlign: 'center',
          }}
        >
          <Typography variant='h3' color='white' paddingY='2rem'>
            Welcome to Education
          </Typography>
          <Typography variant='body1' color='white' paddingY='2rem'>
            We provide a lot of courses for all youth in the community. Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Dolorem tempore
            explicabo neque repellat asperiores libero illo eveniet beatae
            distinctio vero numquam quidem amet voluptates corrupti, harum nam
            officia? Nostrum, praesentium.
          </Typography>
          <Button
            component={Link}
            to='/courses'
            variant='contained'
            color='primary'
            size='large'
          >
            Browse courses
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
