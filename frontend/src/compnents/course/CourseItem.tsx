import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { Course } from '../../types/Course';
import CourseDetailsModal from '../modal/CourseDetailsModal';
import { useRegisterCourseMutation } from '../../hooks/courseHooks';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '../../hooks/hooks';

interface CourseItemProps {
  course: Course;
  setFetchAgain: () => boolean;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, setFetchAgain }) => {
  const [courseDetailsOpen, setCourseDetailsOpen] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const {
    mutateAsync: registerCourse,
    isLoading,
    error,
  } = useRegisterCourseMutation();

  const handleCloseDetailsModal = () => {
    setCourseDetailsOpen(false);
  };

  const handleRegister = async (courseId: string) => {
    await registerCourse(courseId);
    setFetchAgain((val: any) => !val);

    toast.success('The course is registered successfully');
  };

  if (error) {
    toast.error(error?.response?.data?.message);
  }

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardContent>
        <Typography variant='h6'>{course.title}</Typography>
        <Typography variant='subtitle2' sx={{ my: '0.5rem' }}>
          {course.category?.title}
        </Typography>
        <Typography variant='body2' sx={{ mb: '1rem' }}>
          {course.desc}
        </Typography>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: '1rem',
            mb: '0.5rem',
          }}
        >
          <Typography variant='body2'>
            <strong>Start from:</strong> {course.start_date}
          </Typography>
          <Typography variant='body2'>
            <strong>In:</strong> {course.period}
          </Typography>
        </Box>
        <Typography variant='body2'>
          <strong>Time:</strong> {course.time}
        </Typography>

        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button
            variant='contained'
            color='secondary'
            onClick={() => setCourseDetailsOpen(true)}
          >
            View details
          </Button>
          <CourseDetailsModal
            isModalOpen={courseDetailsOpen}
            handleClose={handleCloseDetailsModal}
            course={course}
          />
          <Button
            variant='contained'
            disabled={isLoading || course.registeredUserIds.includes(user._id)}
            onClick={() => handleRegister(course._id)}
          >
            {course.registeredUserIds.includes(user._id)
              ? 'Registered'
              : 'Register'}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CourseItem;
