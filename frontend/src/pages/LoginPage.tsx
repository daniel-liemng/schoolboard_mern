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
} from '@mui/material';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [showPassword, setshowPassword] = useState(false);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleClickShowPassword = () => {
    setshowPassword((val) => !val);
  };

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
          bgcolor: 'white',
          borderRadius: '1rem',
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
