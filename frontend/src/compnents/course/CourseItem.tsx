/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Tooltip,
  Typography,
} from '@mui/material';
import { Course } from '../../types/Course';
import CourseDetailsModal from '../modal/CourseDetailsModal';
import { useRegisterCourseMutation } from '../../hooks/courseHooks';
import { toast } from 'react-hot-toast';
import { useAppSelector } from '../../hooks/hooks';
import { AxiosError } from 'axios';

interface CourseItemProps {
  course: Course;
}

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
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
    await registerCourse(courseId as string);

    toast.success('The course is registered successfully');
  };

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
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
          {user && user.role !== 'admin' && user.role !== 'instructor' ? (
            <Button
              variant='contained'
              disabled={
                isLoading ||
                course.registeredUserIds.includes(user._id as string)
              }
              onClick={() => handleRegister(course._id as string)}
            >
              {course.registeredUserIds.includes(user._id as string)
                ? 'Registered'
                : 'Register'}
            </Button>
          ) : user?.role === 'admin' || user?.role === 'instructor' ? (
            <Tooltip
              title='Admin or instructor is not allowed to register'
              placement='bottom-start'
            >
              <Button variant='contained'>Register</Button>
            </Tooltip>
          ) : (
            <Tooltip title='Login to register' placement='bottom-start'>
              <Button variant='contained'>Register</Button>
            </Tooltip>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default CourseItem;
