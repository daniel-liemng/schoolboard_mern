import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

import { useAppSelector } from '../../hooks/hooks';

interface ProfileModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

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

type FormValues = {
  name: string;
  dob?: Dayjs;
  gender?: string;
  email: string;
  phone?: string;
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  isModalOpen,
  handleClose,
}) => {
  const { user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: user?.name || '',
      dob: user?.dob || dayjs(new Date()),
      gender: user?.gender || '',
      email: user?.email || '',
      phone: user?.phone || '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

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
            Update profile info
          </Typography>

          <Box sx={{ mt: '2rem' }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                id='name'
                type='text'
                label='Name'
                {...register('name', { required: true })}
                variant='outlined'
                fullWidth
                error={!!errors.name}
                sx={{ marginBottom: '1rem' }}
              />
              {errors.name?.type === 'required' && (
                <Box
                  sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}
                >
                  Name is required
                </Box>
              )}

              <TextField
                id='email'
                type='email'
                label='Email'
                {...register('email', { required: true })}
                variant='outlined'
                fullWidth
                error={!!errors.email}
                sx={{ marginBottom: '1rem' }}
              />
              {errors.email?.type === 'required' && (
                <Box
                  sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}
                >
                  Email is required
                </Box>
              )}
              {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale=''>
                <DatePicker
                  label='DOB'
                  sx={{ width: '100%', marginBottom: '1rem' }}
                  {...register('dob')}
                />
              </LocalizationProvider> */}

              <TextField
                id='phone'
                type='text'
                label='Phone'
                {...register('phone', { required: true })}
                variant='outlined'
                fullWidth
                error={!!errors.phone}
                sx={{ marginBottom: '1rem' }}
              />
              {errors.phone?.type === 'required' && (
                <Box
                  sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}
                >
                  Phone number is required
                </Box>
              )}

              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Gender'
                  {...register('gender')}
                >
                  <MenuItem value={''}>None</MenuItem>
                  <MenuItem value={'male'}>Male</MenuItem>
                  <MenuItem value={'female'}>Female</MenuItem>
                </Select>
              </FormControl>

              <Button
                type='submit'
                variant='contained'
                fullWidth
                disableElevation
                size='large'
                sx={{ marginTop: '1rem' }}
              >
                Update
              </Button>
            </form>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProfileModal;
