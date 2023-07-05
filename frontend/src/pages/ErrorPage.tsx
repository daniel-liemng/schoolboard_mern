import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div
      style={{
        // marginTop: '7rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Stack gap='1rem' justifyContent='center' alignItems='center'>
        <Typography variant='h1'>404</Typography>
        <Typography variant='h5'>Page Not Found</Typography>
        <Button component={Link} to='/'>
          Go to Home
        </Button>
      </Stack>
    </div>
  );
};

export default ErrorPage;
