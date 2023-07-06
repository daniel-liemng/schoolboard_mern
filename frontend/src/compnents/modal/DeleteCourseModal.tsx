/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box, Button, Modal, Typography, Backdrop, Fade } from '@mui/material';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';

import { Course } from '../../types/Course';

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

interface DeleteCourseModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  course: Course | undefined;
  handleDeleteCourse: () => void;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({
  course,
  isModalOpen,
  handleClose,
  handleDeleteCourse,
}) => {
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
            sx={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ReportOutlinedIcon fontSize='large' color='error' />
            Confirm delete category
          </Typography>

          <Typography variant='body1' sx={{ marginY: '2rem' }}>
            Are you sure you want to delete course: {course?.title}?
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
              onClick={() => handleDeleteCourse(course?._id)}
              color='error'
            >
              Yes, delete course
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DeleteCourseModal;
