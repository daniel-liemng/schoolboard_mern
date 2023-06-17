import { Box, Button, Typography } from '@mui/material';
import { Session } from '../../types/Session';
import ModalTemplate from './ModalTemplate';
import { useDeleteSessionMutation } from '../../hooks/sessionHooks';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

interface DeleteSessionModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  session: Session;
  courseId: string | undefined;
}

const DeleteSessionModal: React.FC<DeleteSessionModalProps> = ({
  session,
  courseId,
  isModalOpen,
  handleClose,
}) => {
  const {
    mutateAsync: deleteSession,
    isLoading,
    error,
  } = useDeleteSessionMutation(courseId as string);

  const handleDeleteSession = async () => {
    await deleteSession(session?._id as string);

    toast.success('Session Deleted');
    handleClose();
  };

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  return (
    <ModalTemplate
      title='Confirm delete session'
      isModalOpen={isModalOpen}
      handleClose={handleClose}
    >
      <Typography variant='body1' sx={{ marginY: '2rem' }}>
        Are you sure you want to delete category: {session?.date}?
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
          onClick={handleDeleteSession}
          disabled={isLoading}
        >
          Yes, delete session
        </Button>
      </Box>
    </ModalTemplate>
  );
};

export default DeleteSessionModal;
