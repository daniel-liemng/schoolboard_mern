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
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  useSaveAvatarMutation,
  useUpdateProfileMutation,
} from '../hooks/userHooks';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);

  const { mutateAsync: saveAvatar } = useSaveAvatarMutation();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const [profileImg, setProfileImg] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInptElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!file) {
      toast.error('Pick an image to upload');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
    );
    formData.append(
      'cloud_name',
      import.meta.env.VITE_CLOUDINARY_NAME as string
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME as string
      }/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await res.json();

    setProfileImg(data?.secure_url);
    await saveAvatar(data?.secure_url);
    toast.success('Avatar uploaded');
  };

  const handleProfileModalClose = () => {
    setProfileModalOpen(false);
  };

  const handlePasswordModalClose = () => {
    setPasswordModalOpen(false);
  };
  console.log('1212', user);

  return (
    <Box sx={{ marginTop: '2rem', padding: '2rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Card
            sx={{
              padding: '4rem 1rem 1rem 1rem',
              height: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
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
                      style={{
                        width: 120,
                        height: 120,
                        border: '3px solid #817777',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <img
                      src={
                        profileImg ||
                        'https://res.cloudinary.com/danhln/image/upload/v1686861462/eoy7udp1m82afzamam2q.png'
                      }
                      alt=''
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        border: '3px solid #817777',
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
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
                        <input
                          hidden
                          accept='image/*'
                          type='file'
                          onChange={handleUpload}
                        />
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
    </Box>
  );
};

export default ProfilePage;
