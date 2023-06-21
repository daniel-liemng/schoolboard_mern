import { Box, Button, Typography } from '@mui/material';
import ModalTemplate from './ModalTemplate';
import { User } from '../../types/User';

interface ResetPasswordModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  user: User | undefined;
  handleReset: () => void;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isModalOpen,
  handleClose,
  user,
  handleReset,
}) => {
  return (
    <ModalTemplate
      title='Confirm reset password'
      isModalOpen={isModalOpen}
      handleClose={handleClose}
    >
      <Typography variant='body1' sx={{ mt: '2rem' }}>
        Are you sure you want to reset password for user: {user?.name}?
      </Typography>
      <Typography variant='body1' sx={{ mt: '0.5rem' }}>
        The new password is "reset123" to login.
      </Typography>
      <Typography variant='body1' sx={{ mt: '0.5rem' }}>
        Please tell {user?.name} to change password then
      </Typography>

      <Box
        sx={{
          mt: '1.5rem',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Button variant='contained' color='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='contained' onClick={handleReset}>
          Yes, reset it
        </Button>
      </Box>
    </ModalTemplate>
  );
};

export default ResetPasswordModal;
