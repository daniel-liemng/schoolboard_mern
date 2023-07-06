import { Box, Typography } from '@mui/material';

const SettingsPage = () => {
  return (
    <Box sx={{ p: '2rem', height: '100%' }}>
      <Typography variant='h4' align='center' sx={{ mt: '0.5rem' }}>
        Settings
      </Typography>
      <Typography
        variant='h6'
        align='center'
        sx={{ mt: '2rem', color: 'grey' }}
      >
        Under maintenance
      </Typography>
    </Box>
  );
};

export default SettingsPage;
