import { Box, Typography } from '@mui/material';

interface SmallCountBoxProps {
  bgcolor: string;
  count: string;
  text: string;
}

const SmallCountBox: React.FC<SmallCountBoxProps> = ({
  bgcolor,
  count,
  text,
}) => {
  return (
    <Box
      width='100%'
      height='6rem'
      sx={{ backgroundColor: bgcolor, p: '0.5rem', borderRadius: '10px' }}
    >
      <Typography variant='h4' fontWeight='bold' align='center'>
        {count}
      </Typography>
      <Typography variant='h6' align='center'>
        {Number(count) > 1 ? `${text}s` : text}
      </Typography>
    </Box>
  );
};

export default SmallCountBox;
