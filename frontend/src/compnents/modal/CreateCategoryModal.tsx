import { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { useChangePasswordMutation } from '../../hooks/userHooks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

interface CreateCategoryModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

type FormValues = {
  title: string;
};

const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({
  isModalOpen,
  handleClose,
}) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      currentPassword: '',
      password: '',
      password2: '',
    },
  });

  const {
    mutateAsync: changePassword,
    isLoading,
    error,
  } = useChangePasswordMutation();

  const onSubmit = async (data: FormValues) => {
    const { currentPassword, password, password2 } = data;

    if (currentPassword === password) {
      return toast.error('New password must not be the same with the old one');
    }

    if (password !== password2) {
      return toast.error('New password and confirm new password do not match');
    }

    await changePassword({ currentPassword, password });

    reset();
    handleClose();

    toast.success('New password updated');
  };

  if (error) {
    return toast.error(error?.response?.data?.message);
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isModalOpen}>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h5'
            component='h3'
            align='center'
          >
            Change Password
          </Typography>

          <Box sx={{ mt: '2rem' }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FormControl
                variant='outlined'
                fullWidth
                sx={{ marginBottom: '0.5rem' }}
              >
                <InputLabel htmlFor='outlined-adornment-current-password'>
                  Current Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-current-password'
                  type={showCurrentPassword ? 'text' : 'password'}
                  label='Current Password'
                  {...register('currentPassword', {
                    required: true,
                    minLength: 6,
                  })}
                  error={!!errors.currentPassword}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowCurrentPassword((val) => !val)}
                        edge='end'
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.currentPassword?.type === 'required' && (
                <Box
                  sx={{
                    marginBottom: '1rem',
                    color: 'red',
                    textAlign: 'left',
                    ml: '0.5rem',
                    fontSize: '12px',
                  }}
                >
                  Current password is required
                </Box>
              )}
              {errors.currentPassword?.type === 'minLength' && (
                <Box
                  sx={{
                    marginBottom: '1rem',
                    color: 'red',
                    textAlign: 'left',
                    ml: '0.5rem',
                    fontSize: '12px',
                  }}
                >
                  Current password contains at least 6 characters
                </Box>
              )}

              <FormControl
                variant='outlined'
                fullWidth
                sx={{ marginBottom: '0.5rem' }}
              >
                <InputLabel htmlFor='outlined-adornment-password'>
                  New Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={showPassword ? 'text' : 'password'}
                  label='New Password'
                  {...register('password', { required: true, minLength: 6 })}
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword((val) => !val)}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.password?.type === 'required' && (
                <Box
                  sx={{
                    marginBottom: '1rem',
                    color: 'red',
                    textAlign: 'left',
                    ml: '0.5rem',
                    fontSize: '12px',
                  }}
                >
                  New password is required
                </Box>
              )}
              {errors.password?.type === 'minLength' && (
                <Box
                  sx={{
                    marginBottom: '1rem',
                    color: 'red',
                    textAlign: 'left',
                    ml: '0.5rem',
                    fontSize: '12px',
                  }}
                >
                  Password contains at least 6 characters
                </Box>
              )}

              <FormControl
                variant='outlined'
                fullWidth
                sx={{ marginBottom: '0.5rem' }}
              >
                <InputLabel htmlFor='outlined-adornment-password2'>
                  Confirm New Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password2'
                  type={showPassword2 ? 'text' : 'password'}
                  label='Confirm New Password'
                  {...register('password2', { required: true, minLength: 6 })}
                  error={!!errors.password2}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword2((val) => !val)}
                        edge='end'
                      >
                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {errors.password2?.type === 'required' && (
                <Box
                  sx={{
                    marginBottom: '1rem',
                    color: 'red',
                    textAlign: 'left',
                    ml: '0.5rem',
                    fontSize: '12px',
                  }}
                >
                  Confirm password is required
                </Box>
              )}
              {errors.password2?.type === 'minLength' && (
                <Box
                  sx={{
                    marginBottom: '1rem',
                    color: 'red',
                    textAlign: 'left',
                    ml: '0.5rem',
                    fontSize: '12px',
                  }}
                >
                  Confirm password contains at least 6 characters
                </Box>
              )}

              <Button
                type='submit'
                variant='contained'
                fullWidth
                disableElevation
                size='large'
                disabled={isLoading}
                sx={{ marginTop: '1rem' }}
              >
                Change Password
              </Button>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateCategoryModal;
