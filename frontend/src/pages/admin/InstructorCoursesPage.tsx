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
import { Course } from '../../types/Course';
import { Link } from 'react-router-dom';
import DeleteCourseModal from '../../compnents/modal/DeleteCourseModal';
import {
  useDeleteCourseMutation,
  useGetInstructorCoursesQuery,
} from '../../hooks/courseHooks';
import { toast } from 'react-hot-toast';
import Loading from '../../compnents/Loading';
import CreateCategoryModal from '../../compnents/modal/CreateCategoryModal';

const InstructorCoursesPage = () => {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const { data: courses, isLoading } = useGetInstructorCoursesQuery();

  const { mutateAsync: deleteCourse } = useDeleteCourseMutation();

  const handleCourseModalClose = () => {
    setIsCourseModalOpen(false);
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCourse = async (courseId) => {
    await deleteCourse(courseId);
    toast.success('Course Deleted');
    handleCourseModalClose();
    window.location.reload();
  };

  console.log('Course', courses);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{ mt: '1rem' }}>
      <Typography variant='h5' align='center' my='1.5rem'>
        All Courses (Instructor)
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '1rem',
          mb: '1rem',
        }}
      >
        <Button
          onClick={() => setIsCategoryModalOpen(true)}
          variant='contained'
          sx={{ my: '1rem' }}
        >
          Create category
        </Button>
        <CreateCategoryModal
          isModalOpen={isCategoryModalOpen}
          handleClose={handleCategoryModalClose}
        />

        <Button
          to='/admin/course/create-course'
          component={Link}
          variant='contained'
          sx={{ my: '1rem' }}
        >
          Create course
        </Button>
      </Box>

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
                      to={`/admin/summary/${course._id}`}
                      component={Link}
                      variant='contained'
                      size='small'
                      color='info'
                    >
                      Summary
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
                    <DeleteCourseModal
                      course={course}
                      isModalOpen={isCourseModalOpen}
                      handleClose={handleCourseModalClose}
                      handleDeleteCourse={handleDeleteCourse}
                    />
                    <Button
                      to={`/admin/attendance/${course._id}`}
                      component={Link}
                      variant='contained'
                      size='small'
                      color='success'
                    >
                      Attendance
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

export default InstructorCoursesPage;
