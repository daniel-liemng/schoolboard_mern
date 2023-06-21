import { Box, Grid, Typography } from '@mui/material';
import { useGetAllUsersQuery } from '../../hooks/adminHooks';
import { User } from '../../types/User';
import { useGetAllCoursesQuery } from '../../hooks/courseHooks';
import SmallCountBox from '../../compnents/SmallCountBox';
import { Course } from '../../types/Course';

const DashboardPage = () => {
  const { data: users } = useGetAllUsersQuery();
  const { data: courses } = useGetAllCoursesQuery();

  const instructorCount = users?.filter(
    (user: User) => user.role === 'instructor'
  ).length;

  const studentCount = users?.filter(
    (user: User) => user.role === 'user'
  ).length;

  const courseCount = courses?.length;

  const activeCourseCount = courses?.filter(
    (course: Course) => course?.status === 'active'
  ).length;
  const inactiveCourseCount = courses?.filter(
    (course: Course) => course?.status === 'inactive'
  ).length;

  console.log(instructorCount);
  console.log(studentCount);
  // console.log(courseCount);

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
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox bgcolor='#9cadce' count='5' text='dummy' />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;
