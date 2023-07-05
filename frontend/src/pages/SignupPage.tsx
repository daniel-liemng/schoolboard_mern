import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../hooks/userHooks';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setCurrentUser } from '../redux/userSlice';
import { grey } from '@mui/material/colors';

type FormValues = {
  name: string;
  email: string;
  password: string;
  password2: string;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
    },
  });

  const { mutateAsync: signup, isLoading, error } = useSignupUserMutation();

  const [showPassword, setshowPassword] = useState(false);
  const [showPassword2, setshowPassword2] = useState(false);

  useEffect(() => {
    if (isAuthenticated || user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    if (getValues('password') !== getValues('password2')) {
      toast.error('Passwords do not match');
      return;
    }

    const result = await signup({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    const {
      _id,
      name,
      email,
      phone,
      gender,
      dob,
      role,
      registeredCourseIds,
      avatar,
    } = result;
    dispatch(
      setCurrentUser({
        _id,
        name,
        email,
        phone,
        gender,
        dob,
        role,
        registeredCourseIds,
        avatar,
      })
    );

    reset();
    toast.success('Created new account successfully');
    navigate('/');
  };

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '450px',
          textAlign: 'center',
          paddingX: '4rem',
          paddingY: '2rem',
          borderRadius: '1rem',
          boxShadow: '5px 10px 10px 10px rgba(0,0,0,0.1)',
          bgcolor: theme.palette.mode === 'dark' ? grey[600] : '',
        }}
      >
        <Typography variant='h4' marginBottom='2rem'>
          Create an account
        </Typography>
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
            <Box sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}>
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
            <Box sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}>
              Email is required
            </Box>
          )}

          <FormControl
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '0.5rem' }}
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type={showPassword ? 'text' : 'password'}
              label='Password'
              {...register('password', { required: true, minLength: 6 })}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setshowPassword((val) => !val)}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password?.type === 'required' && (
            <Box sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}>
              Password is required
            </Box>
          )}
          {errors.password?.type === 'minLength' && (
            <Box sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}>
              Password contains at least 6 characters
            </Box>
          )}

          <FormControl
            variant='outlined'
            fullWidth
            sx={{ marginBottom: '0.5rem' }}
          >
            <InputLabel htmlFor='outlined-adornment-password2'>
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password2'
              type={showPassword2 ? 'text' : 'password'}
              label='Confirm Password'
              {...register('password2', { required: true, minLength: 6 })}
              error={!!errors.password2}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={() => setshowPassword2((val) => !val)}
                    edge='end'
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {errors.password2?.type === 'required' && (
            <Box sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}>
              Confirm password is required
            </Box>
          )}
          {errors.password2?.type === 'minLength' && (
            <Box sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}>
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
            Sign Up
          </Button>
        </form>

        <Box sx={{ marginTop: '1.5rem' }}>
          <Typography variant='subtitle1'>
            Already have an account?{' '}
            <Link to='/login' style={{ color: 'blue' }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
