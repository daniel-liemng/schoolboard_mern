/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import {
  useGetAllSessionsByCourseIdQuery,
  useUpdateStudentIdsMutation,
} from '../../hooks/sessionHooks';
import { useState } from 'react';
import CreateSessionModal from '../../compnents/modal/CreateSessionModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCourseQuery } from '../../hooks/courseHooks';
import { toast } from 'react-hot-toast';
// import { User } from '../../types/User';
import { Session } from '../../types/Session';

const AttendancePage = () => {
  const { courseId } = useParams();

  const navigate = useNavigate();

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const [selectedSessionId, setSelectedSessionId] = useState('');
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const { data: sessions } = useGetAllSessionsByCourseIdQuery(
    courseId as string
  );
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
    if (!selectedSessionId) {
      toast.error('Please select the session');
    }

    await updateStudents({
      sessionId: selectedSessionId,
      studentData: selectedStudentIds,
    });

    toast.success('Saved attendance');
    navigate('/instructor/courses');
  };

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
              {sessions?.map((sess: Session, index: number) => (
                <MenuItem key={index} value={sess?._id}>
                  Session {index + 1}: {sess?.date}
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
          {studentList?.map((student, index: number) => (
            <ListItem
              key={index}
              secondaryAction={
                <Checkbox
                  edge='end'
                  onChange={handleToggle(student?._id)}
                  checked={selectedStudentIds.indexOf(student?._id) !== -1}
                  // checked={shortAttendList?.includes(student._id)}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt='avatar' src={``} />
                </ListItemAvatar>
                <ListItemText>{student?.name}</ListItemText>
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
