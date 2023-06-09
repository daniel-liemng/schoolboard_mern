import {
  Box,
  Button,
  Modal,
  Typography,
  Backdrop,
  Fade,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

import { useCreateCategoryMutation } from '../../hooks/categoryHooks';
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
  title: string;
};
interface CreateCategoryProps {
  isModalOpen: boolean;
  handleClose: () => void;
}

const CreateCategoryModal: React.FC<CreateCategoryProps> = ({
  isModalOpen,
  handleClose,
}) => {
  const {
    mutateAsync: createCategory,
    isLoading,
    error,
  } = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: { title: string }) => {
    await createCategory(data);
    reset();
    toast.success('Category Created');
    handleClose();
  };

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
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
            Create category
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              id='title'
              label='Title'
              {...register('title', { required: true })}
              variant='outlined'
              fullWidth
              error={!!errors.title}
              sx={{ marginY: '2rem' }}
            />
            {errors.title?.type === 'required' && (
              <Box
                sx={{ marginBottom: '1rem', color: 'red', textAlign: 'left' }}
              >
                Title is required
              </Box>
            )}

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
                disabled={isLoading}
                sx={{ marginTop: '1rem' }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                disableElevation
                size='large'
                // disabled={isLoading}
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

export default CreateCategoryModal;
