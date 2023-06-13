import { Box, Grid, Typography } from '@mui/material';
import { useGetAllUsersQuery } from '../../hooks/adminHooks';
import { User } from '../../types/User';
import { useGetAllCoursesQuery } from '../../hooks/courseHooks';
import SmallCountBox from '../../compnents/SmallCountBox';

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

  console.log(instructorCount);
  console.log(studentCount);
  console.log(courseCount);

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
            <SmallCountBox bgcolor='#adf7b6' count='5' text='upcoming course' />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox bgcolor='#d4afb9' count='5' text='active course' />
          </Grid>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <SmallCountBox bgcolor='#9cadce' count='5' text='expired course' />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;
