import { Box, Button, Modal, Typography, Backdrop, Fade } from '@mui/material';

import { useDeleteCategoryMutation } from '../../hooks/categoryHooks';
import { toast } from 'react-hot-toast';
import { Category } from '../../types/Category';
import { AxiosError } from 'axios';

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

interface DeleteCategoryModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  cat: Category;
}

const DeleteCategoryModal: React.FC<DeleteCategoryModalProps> = ({
  cat,
  isModalOpen,
  handleClose,
}) => {
  const {
    mutateAsync: deleteCategory,
    isLoading,
    error,
  } = useDeleteCategoryMutation();

  const handleDeleteCategory = async (catId: string) => {
    await deleteCategory(catId);
    toast.success('Category Deleted');
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
            Confirm delete category
          </Typography>

          <Typography variant='body1' sx={{ marginY: '2rem' }}>
            Are you sure you want to delete category: {cat?.title}?
          </Typography>

          <Box
            sx={{
              mt: '1.5rem',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Button variant='contained' color='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button
              variant='contained'
              onClick={() => handleDeleteCategory(cat._id)}
              disabled={isLoading}
            >
              Yes, delete category
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteCategoryModal;
