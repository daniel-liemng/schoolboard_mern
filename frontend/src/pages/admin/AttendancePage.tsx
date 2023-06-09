import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useGetAllSessions } from '../../hooks/sessionHooks';
import { useState } from 'react';
import CreateSessionModal from '../../compnents/modal/CreateSessionModal';
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../../hooks/courseHooks';

const AttendancePage = () => {
  const { courseId } = useParams();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const { data: sessions } = useGetAllSessions(courseId as string);
  const { data: course } = useGetCourseQuery(courseId as string);

  // console.log('999', data);

  return (
    <Paper sx={{ m: '2rem', p: '2rem' }}>
      <Typography variant='h5' color='primary' align='center'>
        Check attendance
      </Typography>

      <Grid container spacing={2} sx={{ mt: '1.5rem' }}>
        <Grid item xs={3}>
          <Typography variant='h6'>Session</Typography>
          <Button
            onClick={() => setIsSessionModalOpen(true)}
            variant='contained'
            size='small'
            sx={{ my: '1rem' }}
          >
            Create session
          </Button>
          <CreateSessionModal
            isModalOpen={isSessionModalOpen}
            handleClose={() => setIsSessionModalOpen(false)}
            courseId={courseId}
          />

          <List>
            {sessions?.map((session, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemText>{session.date}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Typography variant='h6'>Check attendance</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AttendancePage;
