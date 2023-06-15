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
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ja';
import { User } from '../../types/User';
import { useUpdateProfileMutation } from '../../hooks/userHooks';
import { toast } from 'react-hot-toast';

// import { useAppSelector } from '../../hooks/hooks';

interface ProfileModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  user: User;
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

const validationRules = {
  name: {
    required: 'Please provide name',
  },
  email: {
    required: 'Please provide email',
  },
  phone: {
    required: 'Please provide phone',
  },
  gender: {
    required: 'Please choose your gender',
  },
  dob: {
    validate: (val: Dayjs | null) => {
      if (val === null) {
        return 'Please select the date';
      }

      if (!val.format('MMDDYYYY').match(/^\d{8}$/g)) {
        return 'Invalid date formats';
      }

      return true;
    },
  },
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  isModalOpen,
  handleClose,
  user,
}) => {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
  });

  const {
    mutateAsync: updateProfileFunc,
    isLoading,
    error,
  } = useUpdateProfileMutation();

  // useEffect(() => {
  //   const defaultValues: { name: string; email: string } = {
  //     name: '',
  //     email: '',
  //   };

  //   defaultValues.name = user?.name;
  //   defaultValues.email = user?.email;
  //   // reset({ ...defaultValues });
  // }, []);

  const onSubmit = async (data: FormValues) => {
    // console.log(dayjs(data.dob).format('MM/DD/YYYY'));
    const profileData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      dob: dayjs(data.dob).format('MM/DD/YYYY'),
    };

    await updateProfileFunc(profileData);
    toast.success('Profile Updated');
    handleClose();
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
              <Controller
                name='name'
                control={control}
                defaultValue={user?.name || ''}
                rules={validationRules.name}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='text'
                    label='Name'
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    sx={{ marginBottom: '1rem' }}
                  />
                )}
              />

              <Controller
                name='email'
                control={control}
                defaultValue={user?.email || ''}
                rules={validationRules.email}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='email'
                    label='Email'
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    sx={{ marginBottom: '1rem' }}
                    disabled
                  />
                )}
              />

              <Controller
                name='phone'
                control={control}
                defaultValue={user?.phone || ''}
                rules={validationRules.phone}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type='text'
                    label='Phone number'
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    sx={{ marginBottom: '1rem' }}
                  />
                )}
              />

              <Controller
                name='gender'
                control={control}
                defaultValue={user?.gender || ''}
                rules={validationRules.gender}
                render={({ field, fieldState }) => (
                  <FormControl
                    fullWidth
                    error={!!fieldState.error?.message}
                    sx={{ marginBottom: '1rem' }}
                  >
                    <InputLabel id='gender'>Gender</InputLabel>
                    <Select {...field} label='Gender' labelId='gender'>
                      <MenuItem sx={{ color: 'gray', fontSize: '14px' }}>
                        Please choose your gender
                      </MenuItem>
                      <MenuItem value='male'>Male</MenuItem>
                      <MenuItem value='female'>Female</MenuItem>
                    </Select>
                    <FormHelperText>{fieldState.error?.message}</FormHelperText>
                  </FormControl>
                )}
              />

              <Controller
                name='dob'
                control={control}
                defaultValue={dayjs(user?.dob) || dayjs('')}
                // rules={validationRules.dob}
                render={({ field, fieldState }) => (
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale='en'
                  >
                    <DatePicker
                      {...field}
                      label='DOB'
                      slotProps={{
                        textField: {
                          variant: 'outlined',
                          fullWidth: true,
                        },
                      }}
                      onChange={(date) => field.onChange(date)}
                    />
                    <FormHelperText
                      sx={{
                        color: 'red',
                        marginLeft: '1rem',
                      }}
                    >
                      {fieldState.error?.message}
                    </FormHelperText>
                  </LocalizationProvider>
                )}
              />

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
