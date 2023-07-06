import { Box } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

const Loading = () => {
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
      <ClipLoader size={120} />
    </Box>
  );
};

export default Loading;
