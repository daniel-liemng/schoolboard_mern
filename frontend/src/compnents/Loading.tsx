import { Box, useTheme } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ClipLoader size={60} />
    </Box>
  );
};

export default Loading;
