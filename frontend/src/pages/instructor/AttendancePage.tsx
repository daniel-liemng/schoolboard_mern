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
  useGetAllSessionsByCourseIdQuery,
  useGetSessionQuery,
  useUpdateStudentIdsMutation,
} from '../../hooks/sessionHooks';
import { useState } from 'react';
import CreateSessionModal from '../../compnents/modal/CreateSessionModal';
import { useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../../hooks/courseHooks';
import { toast } from 'react-hot-toast';
import { User } from '../../types/User';

const AttendancePage = () => {
  const { courseId } = useParams();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const { data: sessions } = useGetAllSessionsByCourseIdQuery(
    courseId as string
  );
  const { data: course } = useGetCourseQuery(courseId as string);
  const { mutateAsync: updateStudents } = useUpdateStudentIdsMutation();
  const { data: session } = useGetSessionQuery(selectedSessionId);

  const studentList = course?.registeredUserIds;
  // const allStudentId = studentList?.map()

  const fullAttendList = session?.attendedStudentIds;
  const shortAttendList = fullAttendList?.map((item) => item._id);

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

  // console.log('999', studentList);
  // console.log('SESS', selectedSessionId);
  // console.log('ALL', selectedStudentIds);
  // console.log('ONE_SESSION', session);
  // console.log('ATT_LIST', shortAttendList);
  console.log('**99**', course);

  return (
    <Box sx={{ p: '3rem' }}>
      <Typography variant='h4' align='center' sx={{ mb: '3rem' }}>
        Check attendance
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: '2rem',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: '1' }}>
          <FormControl fullWidth>
            <InputLabel id='session'>Select Session</InputLabel>
            <Select
              labelId='session'
              label='Select Session'
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
            >
              <MenuItem disabled>Select a session</MenuItem>
              {sessions?.map((sess, index) => (
                <MenuItem key={index} value={sess._id}>
                  Session {index + 1}: {sess.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flex: '1' }}>
          <Button
            onClick={() => setIsSessionModalOpen(true)}
            variant='contained'
          >
            Create session
          </Button>
          <CreateSessionModal
            isModalOpen={isSessionModalOpen}
            handleClose={() => setIsSessionModalOpen(false)}
            courseId={courseId}
          />
        </Box>
      </Box>

      <Box sx={{ width: '50%', minWidth: '300px', my: '2rem' }}>
        <List>
          {studentList?.map((student: User, index: number) => (
            <ListItem
              key={index}
              secondaryAction={
                <Checkbox
                  edge='end'
                  onChange={handleToggle(student._id)}
                  checked={selectedStudentIds.indexOf(student._id) !== -1}
                  // checked={shortAttendList?.includes(student._id)}
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
      </Box>
    </Box>
  );
};

export default AttendancePage;
