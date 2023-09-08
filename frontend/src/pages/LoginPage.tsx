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
import { useEffect, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../hooks/userHooks.js';
import { toast } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '../hooks/hooks.js';
import { setCurrentUser } from '../redux/userSlice.js';
import Loading from '../compnents/Loading.js';
import { grey } from '@mui/material/colors';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: login, isLoading, error } = useLoginUserMutation();

  const [showPassword, setshowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated || user) {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data: { email: string; password: string }) => {
    // const result = await login(data);

    const result = await axios.post('/api/users/login', data);

    console.log(result);

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
      // eslint-disable-next-line no-unsafe-optional-chaining
    } = result?.data;

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
    toast.success('Logged in successfully');
    navigate('/');
  };

  const handleClickShowPassword = () => {
    setshowPassword((val) => !val);
  };

  if (isLoading) {
    return <Loading />;
  }

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
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    onClick={handleClickShowPassword}
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

          <Button
            type='submit'
            variant='contained'
            fullWidth
            disableElevation
            size='large'
            disabled={isLoading}
            sx={{ marginTop: '1rem' }}
          >
            Login
          </Button>
        </form>

        <Box sx={{ marginTop: '1.5rem' }}>
          <Typography variant='subtitle1'>
            Don't have an account?{' '}
            <Link to='/signup' style={{ color: 'blue' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
