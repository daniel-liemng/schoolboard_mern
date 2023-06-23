import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {
  useAdminGetInstructorCourses,
  useGetAllUsersQuery,
} from '../../hooks/adminHooks';
import { User } from '../../types/User';
import { useGetAllCoursesQuery } from '../../hooks/courseHooks';
import SmallCountBox from '../../compnents/SmallCountBox';
import { Course } from '../../types/Course';

const DashboardPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: courses } = useGetAllCoursesQuery();

  const { data: instructors } = useAdminGetInstructorCourses();

  const instructorCount = users?.filter(
    (user: User) => user?.role === 'instructor'
  ).length;

  const studentCount = users?.filter(
    (user: User) => user?.role === 'user'
  ).length;

  const courseCount = courses?.length;

  const activeCourseCount = courses?.filter(
    (course: Course) => course?.status === 'active'
  ).length;

  const inactiveCourseCount = courses?.filter(
    (course: Course) => course?.status === 'inactive'
  ).length;

  return (
    <Box>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox
              bgcolor='#ffc09f'
              count={instructorCount}
              text='instructor'
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox
              bgcolor='#ffee93'
              count={studentCount}
              text='student'
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox
              bgcolor='#a0ced9'
              count={courseCount}
              text='course'
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox
              bgcolor='#adf7b6'
              count={activeCourseCount}
              text='active course'
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox
              bgcolor='#d4afb9'
              count={inactiveCourseCount}
              text='inactive course'
            />
          </Grid>
        </Grid>

        <Typography variant='h5' sx={{ my: '1.5rem' }}>
          Instructors
        </Typography>

        {instructors?.map((instructor: User, index: number) => (
          <Card key={index} sx={{ p: '2rem', mb: '1.5rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '90%',
              }}
            >
              <Typography variant='h6'>
                {instructor?.name} - <strong>{instructor?.email}</strong>
              </Typography>

              <Typography variant='h6'>
                {instructor?.createdCourseIds?.length} courses
              </Typography>
            </Box>

            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Course Name</TableCell>
                    <TableCell align='left'>Status</TableCell>
                    <TableCell align='left'>Registered Students</TableCell>
                    <TableCell align='left'>No of Sessions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {instructor?.createdCourseIds?.map((course, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {course?.title}
                      </TableCell>
                      <TableCell
                        align='left'
                        sx={{ textTransform: 'capitalize' }}
                      >
                        {course?.status}
                      </TableCell>
                      <TableCell align='left'>
                        {course?.registeredUserIds?.length}
                      </TableCell>
                      <TableCell align='left'>
                        {course?.sessionIds?.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardPage;
