import { Avatar, Box, Button, Grid, Modal, Typography } from '@mui/material';

import ModalTemplate from './ModalTemplate';
import { User } from '../../types/User';

interface UserInfoModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  user: User | undefined;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isModalOpen,
  handleClose,
  user,
}) => {
  return (
    <ModalTemplate
      title='Information'
      isModalOpen={isModalOpen}
      handleClose={handleClose}
    >
      <Grid container spacing={2} sx={{ mt: '1rem' }}>
        <Grid
          item
          xs={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {user?.avatar ? (
            <img
              src={user?.avatar}
              alt='profile'
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Avatar sx={{ width: 80, height: 80 }} />
          )}
        </Grid>
        <Grid item xs={8}>
          <Typography variant='h6' sx={{ mt: '0.1rem', mb: '0.5rem' }}>
            {user?.name}
          </Typography>
          <Typography variant='body2' sx={{ mb: '0.2rem' }}>
            <strong>Email:</strong> {user?.email}
          </Typography>
          <Typography variant='body2' sx={{ mb: '0.2rem' }}>
            <strong>Phone:</strong> {user?.phone}
          </Typography>
          <Typography variant='body2' sx={{ mb: '0.2rem' }}>
            <strong>DOB:</strong> {user?.dob}
          </Typography>
          <Typography
            variant='body2'
            sx={{ mb: '0.2rem', textTransform: 'capitalize' }}
          >
            <strong>Gender:</strong> {user?.gender}
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ mt: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={handleClose}>
          Close
        </Button>
      </Box>
    </ModalTemplate>
  );
};

export default UserInfoModal;
