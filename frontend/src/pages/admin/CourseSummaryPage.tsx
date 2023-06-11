import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useGetCourseQuery } from '../../hooks/courseHooks';
import { useParams } from 'react-router-dom';
import { useGetAllSessionsByCourseIdQuery } from '../../hooks/sessionHooks';

const CourseSummaryPage = () => {
  const { courseId } = useParams();

  const { data: course } = useGetCourseQuery(courseId as string);
  const { data: sessions } = useGetAllSessionsByCourseIdQuery(
    courseId as string
  );

  const sessionCount = course?.sessionIds.length;
  const studentCount = course?.registeredUserIds.length;

  return (
    <Paper sx={{ m: '2rem', p: '2rem' }}>
      <Typography variant='h4' align='center' fontWeight='bold'>
        Course Summary
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ my: '1.5rem' }}>
          <Typography variant='h6' fontWeight='semibold'>
            {course?.title} | ({course?.course_code})
          </Typography>
          <Typography variant='body1' fontWeight='semibold'>
            Category: {course?.category?.title}
          </Typography>
          <Typography variant='body1' fontWeight='semibold'>
            Instructor: {course?.instructor?.name}
          </Typography>
          <Typography variant='body1' fontWeight='semibold'>
            Total students: {course?.total_student}
          </Typography>
          <Typography variant='body1' fontWeight='semibold'>
            Start: {course?.start_date} in {course?.period}
          </Typography>
          <Typography variant='body1' fontWeight='semibold'>
            Schedule: {course?.day} | {course?.time}
          </Typography>
        </Grid>

        <Grid item xs={6} sx={{ my: '1.5rem' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap`',
              height: '100%',
            }}
          >
            <Box
              width='10rem'
              height='6rem'
              sx={{ bgcolor: '#acddde', p: '0.5rem', borderRadius: '10px' }}
            >
              <Typography variant='h4' fontWeight='bold' align='center'>
                {sessionCount}
              </Typography>
              <Typography variant='h6' align='center'>
                {sessionCount <= 1 ? `session` : ` sessions`}
              </Typography>
            </Box>

            <Box
              width='10rem'
              height='6rem'
              sx={{ bgcolor: '#e1f8dc', p: '0.5rem', borderRadius: '10px' }}
            >
              <Typography variant='h4' fontWeight='bold' align='center'>
                {studentCount}
              </Typography>
              <Typography variant='h6' align='center'>
                {studentCount <= 1 ? `student` : ` students`}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            <strong>Description</strong>
          </Typography>
          <Typography variant='body1'>{course?.desc}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>
            <strong>Sessions</strong>
          </Typography>

          <TableContainer component={Paper} sx={{ mt: '1rem' }}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell align='left'>Attended Students</TableCell>
                  <TableCell align='left'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sessions?.map((session, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {session?.date}
                    </TableCell>
                    <TableCell align='left'>
                      {session?.attendedStudentIds.length}
                    </TableCell>
                    <TableCell align='left'>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.5rem',
                        }}
                      >
                        <Button variant='contained' size='small'>
                          Details
                        </Button>
                        <Button
                          variant='contained'
                          size='small'
                          color='secondary'
                        >
                          Update
                        </Button>
                        <Button variant='contained' size='small' color='error'>
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CourseSummaryPage;
