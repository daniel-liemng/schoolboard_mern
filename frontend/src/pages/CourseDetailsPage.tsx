import { Box, Typography } from '@mui/material';
import { useGetCourseQuery } from '../hooks/courseHooks';
import { useParams } from 'react-router-dom';
import Loading from '../compnents/Loading';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

const CourseDetailsPage = () => {
  const { courseId } = useParams();

  const {
    data: course,
    isLoading,
    error,
  } = useGetCourseQuery(courseId as string);

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant='h4' align='center'>
        Course Details
      </Typography>
      <Box sx={{ display: 'flex', gap: '1rem', mt: '2rem' }}>
        <Box sx={{ flex: '1' }}>
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
        <Box sx={{ mt: '1.5rem', flex: '1' }}>
          <Typography sx={{ fontSize: '15px', fontWeight: 500 }}>
            Description
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'justify' }}>
            {course.desc}
          </Typography>
        </Box>
        T
      </Box>
    </Box>
  );
};

export default CourseDetailsPage;
