import { useState } from 'react';
import {
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
import { useGetUserCoursesQuery } from '../hooks/userHooks';
import CourseDetailsModal from '../compnents/modal/CourseDetailsModal';
import { Course } from '../types/Course';
import { Link } from 'react-router-dom';
import { LinkedCamera } from '@mui/icons-material';

const UserCoursesPage = () => {
  const { data: courses } = useGetUserCoursesQuery();

  console.log('Course', courses);

  if (!courses) {
    return null;
  }

  return (
    <Container sx={{ mt: '1rem' }}>
      <Typography variant='h5' align='center' my='1.5rem'>
        Registered Courses
      </Typography>
      <Button
        to='/admin/course/create-course'
        component={Link}
        variant='contained'
        sx={{ my: '1rem' }}
      >
        Create course
      </Button>
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
                  <Button
                    to={`/admin/course/${course._id}`}
                    component={Link}
                    variant='contained'
                    size='small'
                    sx={{ mr: '0.5rem' }}
                  >
                    Details
                  </Button>
                  <Button
                    to={`/admin/course/update-course/${course._id}`}
                    component={Link}
                    variant='contained'
                    size='small'
                    color='secondary'
                    sx={{ mr: '0.5rem' }}
                  >
                    Update
                  </Button>
                  <Button variant='contained' size='small' color='error'>
                    Delete
                  </Button>
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
