import { useState } from 'react';
import {
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
import Loading from '../compnents/Loading';
import { Course } from '../types/Course';

const UserCoursesPage = () => {
  const { data: courses, isLoading } = useGetUserCoursesQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{ mt: '1rem' }}>
      <Typography variant='h5' align='center' my='1.5rem'>
        All Registered Courses (User)
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserCoursesPage;
