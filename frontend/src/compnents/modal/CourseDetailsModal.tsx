import { Box, Button, Modal, Typography, Backdrop, Fade } from '@mui/material';
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

interface CourseDetailsModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  course: Course;
}

const CourseDetailsModal: React.FC<CourseDetailsModalProps> = ({
  course,
  isModalOpen,
  handleClose,
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
            align='center'
          >
            Course Details
          </Typography>

          <Box sx={{ display: 'flex', gap: '1rem', mt: '1rem' }}>
            <Box>
              <Typography variant='subtitle2' sx={{ color: 'grey' }}>
                {course.category.title}
              </Typography>
              <Typography variant='h6' sx={{ mt: '0.1rem', mb: '0.5rem' }}>
                {course.title}
              </Typography>
              <Typography variant='body2' sx={{ mb: '0.2rem' }}>
                <strong>Course Code:</strong> {course.course_code}
              </Typography>
              <Typography variant='body2' sx={{ mb: '0.2rem' }}>
                <strong>Instructor:</strong> {course.instructor.name}
              </Typography>

              <Typography variant='body2' sx={{ mb: '0.2rem' }}>
                <strong>Start from:</strong> {course.start_date}
              </Typography>
              <Typography variant='body2' sx={{ mb: '0.2rem' }}>
                <strong>In:</strong> {course.period}
              </Typography>
              <Typography variant='body2' sx={{ mb: '0.2rem' }}>
                <strong>Time:</strong> {course.time}
              </Typography>
              <Typography variant='body2' sx={{ mb: '0.2rem' }}>
                <strong>Max Students :</strong> {course.total_student}
              </Typography>
              <Typography variant='body2'>
                <strong>Fee :</strong> ${course.fee}
              </Typography>
            </Box>

            <Box sx={{ mt: '1.5rem' }}>
              <Typography sx={{ fontSize: '15px', fontWeight: 500 }}>
                Description
              </Typography>
              <Typography variant='body2' sx={{ textAlign: 'justify' }}>
                {course.desc}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CourseDetailsModal;
