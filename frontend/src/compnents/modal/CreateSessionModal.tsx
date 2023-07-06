/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Button,
  Modal,
  Typography,
  Backdrop,
  Fade,
  FormHelperText,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

import { useCreateSessionMutation } from '../../hooks/sessionHooks';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
  date: string;
};

interface CreateSessionProps {
  isModalOpen: boolean;
  handleClose: () => void;
  courseId: string | undefined;
}

const CreateSessionModal: React.FC<CreateSessionProps> = ({
  isModalOpen,
  handleClose,
  courseId,
}) => {
  const {
    mutateAsync: createSession,
    isLoading,
    error,
  } = useCreateSessionMutation();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormValues) => {
    await createSession({
      courseId,
      date: dayjs(data.date).format('MM/DD/YYYY'),
    });
    reset();
    toast.success('Session Created');
    handleClose();
  };

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  console.log('787878', dayjs(new Date()));

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
            Create session
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name='date'
              control={control}
              defaultValue={dayjs(new Date())}
              // rules={validationRules.dob}
              render={({ field, fieldState }) => (
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale='en'
                >
                  <DatePicker
                    {...field}
                    label='Date'
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
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}
            >
              <Button
                type='button'
                onClick={handleClose}
                variant='contained'
                color='secondary'
                disableElevation
                size='large'
                sx={{ marginTop: '1rem' }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                disableElevation
                size='large'
                disabled={isLoading}
                sx={{ marginTop: '1rem' }}
              >
                Create
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateSessionModal;
