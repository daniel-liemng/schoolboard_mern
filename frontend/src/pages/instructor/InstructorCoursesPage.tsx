/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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
  TextField,
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

  const [deleteCourse, setDeleteCourse] = useState<Course>();

  const [searchTerm, setSearchTerm] = useState('');

  const { data: courses, isLoading } = useGetInstructorCoursesQuery();

  const { mutateAsync: deleteCourseHandler } = useDeleteCourseMutation();

  const handleCourseModalClose = () => {
    setIsCourseModalOpen(false);
  };

  const handleCategoryModalClose = () => {
    setIsCategoryModalOpen(false);
  };

  const handleDeleteCourse = async (courseId: string) => {
    await deleteCourseHandler(courseId as string);
    toast.success('Course Deleted');
    handleCourseModalClose();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container sx={{ mt: '1rem' }}>
      <Typography variant='h4' align='center' my='2rem'>
        All Courses
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

      <Box>
        <TextField
          fullWidth
          size='small'
          label='Search Course'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: '1.5rem' }}
        />
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
            {courses
              ?.filter((course) =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              ?.map((course: Course, index: number) => (
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
                        to={`/instructor/course/${course._id}`}
                        component={Link}
                        variant='contained'
                        size='small'
                        color='info'
                      >
                        Details
                      </Button>
                      <Button
                        to={`/instructor/course/update/${course._id}`}
                        component={Link}
                        variant='contained'
                        size='small'
                        color='secondary'
                      >
                        Update
                      </Button>
                      <Button
                        onClick={() => {
                          setDeleteCourse(course);
                          setIsCourseModalOpen(true);
                        }}
                        variant='contained'
                        size='small'
                        color='error'
                      >
                        Delete
                      </Button>
                      <DeleteCourseModal
                        course={deleteCourse}
                        isModalOpen={isCourseModalOpen}
                        handleClose={handleCourseModalClose}
                        handleDeleteCourse={handleDeleteCourse}
                      />
                      <Button
                        to={`/instructor/course/attendance/${course._id}`}
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
