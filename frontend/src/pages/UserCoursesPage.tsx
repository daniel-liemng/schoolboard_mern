import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGetUserCoursesQuery } from '../hooks/userHooks';
import Loading from '../compnents/Loading';
import { Course } from '../types/Course';

const UserCoursesPage = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const { data: courses, isLoading } = useGetUserCoursesQuery();

  const handleCourseModalClose = () => {
    setIsCourseModalOpen(false);
  };

  console.log('Course', courses);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{ mt: '1rem' }}>
      <Typography variant='h5' align='center' my='1.5rem'>
        All Courses (User)
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Category</TableCell>
              <TableCell align='left'>Instructor</TableCell>
              <TableCell align='left'>Day</TableCell>
              <TableCell align='left'>Time</TableCell>
              <TableCell align='left'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course: Course, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {course.course_code}
                </TableCell>
                <TableCell align='left'>{course.title}</TableCell>
                <TableCell align='left'>{course.category.title}</TableCell>
                <TableCell align='left'>{course.instructor?.name}</TableCell>
                <TableCell align='left'>{course.day}</TableCell>
                <TableCell align='left'>{course.time}</TableCell>
                <TableCell align='left'>
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                  >
                    <Button
                      to={`/admin/course/${course._id}`}
                      component={Link}
                      variant='contained'
                      size='small'
                    >
                      Details
                    </Button>
                    <Button
                      to={`/admin/course/update-course/${course._id}`}
                      component={Link}
                      variant='contained'
                      size='small'
                      color='secondary'
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => setIsCourseModalOpen(true)}
                      variant='contained'
                      size='small'
                      color='error'
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserCoursesPage;
