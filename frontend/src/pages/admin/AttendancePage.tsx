import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import {
  useGetAllSessions,
  useUpdateStudentIdsMutation,
} from '../../hooks/sessionHooks';
import { useState } from 'react';
import CreateSessionModal from '../../compnents/modal/CreateSessionModal';
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../../hooks/courseHooks';
import { toast } from 'react-hot-toast';

const AttendancePage = () => {
  const { courseId } = useParams();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const { data: sessions } = useGetAllSessions(courseId as string);
  const { data: course } = useGetCourseQuery(courseId as string);
  const { mutateAsync: updateStudents } = useUpdateStudentIdsMutation();

  const studentList = course?.registeredUserIds;

  const handleToggle = (value: string) => () => {
    const currentIndex = selectedStudentIds.indexOf(value);
    const newChecked = [...selectedStudentIds];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedStudentIds(newChecked);
  };

  const handleUpdateStudents = async () => {
    await updateStudents({
      sessionId: selectedSessionId,
      studentData: selectedStudentIds,
    });

    toast.success('Saved attendance');
  };

  console.log('999', studentList);
  console.log('SESS', selectedSessionId);
  console.log('ALL', selectedStudentIds);

  return (
    <Paper sx={{ m: '2rem', p: '2rem' }}>
      <Typography variant='h5' color='primary' align='center'>
        Check attendance
      </Typography>

      <Grid container spacing={2} sx={{ mt: '1.5rem' }}>
        <Grid item xs={4}>
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

          <Typography variant='h6' sx={{ mb: '1.5rem' }}>
            Select the session
          </Typography>
          <FormControl fullWidth>
            <InputLabel id='session'>Session</InputLabel>
            <Select
              labelId='session'
              label='Session'
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
            >
              {sessions?.map((sess, index) => (
                <MenuItem key={index} value={sess._id}>
                  Session {index + 1}: {sess.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8}>
          <Typography variant='h6' align='center'>
            Check attendance
          </Typography>
          {/* List all registered students */}
          <List dense sx={{ width: '100%' }}>
            {studentList?.map((student, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggle(student._id)}
                    checked={selectedStudentIds.indexOf(student._id) !== -1}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar alt='avatar' src={``} />
                  </ListItemAvatar>
                  <ListItemText>{student.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleUpdateStudents} variant='contained'>
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AttendancePage;
