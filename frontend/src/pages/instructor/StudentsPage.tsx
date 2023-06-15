import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useGetInstructorAllStudentsQuery } from '../../hooks/instructorHooks';
import Loading from '../../compnents/Loading';
import { User } from '../../types/User';
import UserInfoModal from '../../compnents/modal/UserInfoModal';
import UserRegisteredCourseModal from '../../compnents/modal/UserRegisteredCourseModal';

const StudentsPage = () => {
  const {
    data: allMyStudents,
    isLoading,
    error,
  } = useGetInstructorAllStudentsQuery();

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [registeredCourseModalOpen, setRegisteredCourseModalOpen] =
    useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  console.log('AALL', allMyStudents);

  return (
    <Box sx={{ p: '3rem' }}>
      <Typography variant='h4' align='center' sx={{ mb: '3rem' }}>
        My students
      </Typography>

      {isLoading && <Loading />}

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='left'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMyStudents?.map((student: User, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {student?.avatar ? (
                    <img
                      src={student?.avatar}
                      alt='profile'
                      style={{ width: 100, height: 100 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 30, height: 30 }} />
                  )}
                </TableCell>
                <TableCell align='left'>{student.name}</TableCell>
                <TableCell align='left'>{student.email}</TableCell>
                <TableCell align='left'>
                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}
                  >
                    <Button
                      type='button'
                      onClick={() => {
                        setSelectedUser(student);
                        setUserModalOpen(true);
                      }}
                      variant='contained'
                      size='small'
                      color='info'
                    >
                      Info
                    </Button>
                    <UserInfoModal
                      isModalOpen={userModalOpen}
                      handleClose={() => setUserModalOpen(false)}
                      user={selectedUser}
                    />

                    <Button
                      type='button'
                      onClick={() => {
                        setSelectedUser(student);
                        setRegisteredCourseModalOpen(true);
                      }}
                      variant='contained'
                      size='small'
                      color='secondary'
                    >
                      Registered course
                    </Button>
                    <UserRegisteredCourseModal
                      isModalOpen={registeredCourseModalOpen}
                      handleClose={() => setRegisteredCourseModalOpen(false)}
                      user={selectedUser}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentsPage;
