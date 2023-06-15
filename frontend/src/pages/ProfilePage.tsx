import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Tooltip,
  Paper,
  Typography,
} from '@mui/material';

import { useAppSelector } from '../hooks/hooks';
import { PhotoCamera } from '@mui/icons-material';
import ProfileModal from '../compnents/modal/ProfileModal';
import ChangePasswordModal from '../compnents/modal/ChangePasswordModal';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const handleUpload = () => {
    console.log('Upload');
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
  };

  const handlePasswordModalClose = () => {
    setPasswordModalOpen(false);
  };

  return (
    <Box sx={{ marginTop: '2rem', padding: '2rem' }}>
      <Paper sx={{ padding: '3rem', width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                padding: '1rem',
                height: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ position: 'absolute' }}>
                    {user?.avatar ? (
                      <img
                        src={user?.avatar}
                        alt='profile'
                        style={{ width: 100, height: 100 }}
                      />
                    ) : (
                      <Avatar sx={{ width: 100, height: 100 }} />
                    )}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -5,
                        right: -5,
                      }}
                    >
                      <Tooltip title='Upload avatar'>
                        <IconButton
                          color='primary'
                          aria-label='upload picture'
                          component='label'
                          size='small'
                          sx={{
                            bgcolor: 'grey',
                            padding: '5px',
                            '&:hover': {
                              bgcolor: '#90ee90',
                            },
                          }}
                        >
                          <input hidden accept='image/*' type='file' />
                          <PhotoCamera sx={{ width: 25, height: 25 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mt: '150px' }}>
                  <Button
                    variant='contained'
                    onClick={() => setPasswordModalOpen(true)}
                  >
                    Change Password
                  </Button>
                  <ChangePasswordModal
                    isModalOpen={passwordModalOpen}
                    handleClose={handlePasswordModalClose}
                  />
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card sx={{ padding: '2rem' }}>
              <Grid container spacing={2}>
                <Grid item xs={4} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Name
                  </Typography>
                </Grid>
                <Grid item xs={8} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    {user.name}
                  </Typography>
                </Grid>

                <Grid item xs={4} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={8} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    {user.email}
                  </Typography>
                </Grid>

                <Grid item xs={4} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Phone Number
                  </Typography>
                </Grid>
                <Grid item xs={8} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    {user.phone || 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={4} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Gender
                  </Typography>
                </Grid>
                <Grid item xs={8} sx={{ mt: '1rem' }}>
                  <Typography
                    variant='body1'
                    sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                  >
                    {user.gender || 'N/A'}
                  </Typography>
                </Grid>

                <Grid item xs={4} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                    Date of Birth
                  </Typography>
                </Grid>
                <Grid item xs={8} sx={{ mt: '1rem' }}>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                    {user.dob || 'N/A'}
                  </Typography>
                </Grid>
              </Grid>

              <Button
                onClick={() => setProfileModalOpen(true)}
                variant='contained'
                fullWidth
                sx={{ mt: '2rem   ' }}
              >
                Update Profile Info
              </Button>
              <ProfileModal
                isModalOpen={profileModalOpen}
                handleClose={handleProfileModalClose}
                user={user}
              />
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
