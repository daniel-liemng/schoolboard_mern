/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import ModalTemplate from './ModalTemplate';
import { User } from '../../types/User';

interface UserRegisteredCourseModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  user: User | undefined;
}

const UserRegisteredCourseModal: React.FC<UserRegisteredCourseModalProps> = ({
  isModalOpen,
  handleClose,
  user,
}) => {
  return (
    <ModalTemplate
      title='Registered courses'
      isModalOpen={isModalOpen}
      handleClose={handleClose}
    >
      <TableContainer>
        <Table sx={{ minWidth: 800, mt: '1rem' }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='left'>Code</TableCell>
              <TableCell align='left'>Instructor</TableCell>
              <TableCell align='left'>Start Date</TableCell>
              <TableCell align='left'>Day</TableCell>
              <TableCell align='left'>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user?.registeredCourseIds?.map((course, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {course?.course_code}
                </TableCell>
                <TableCell align='left'>{course?.title}</TableCell>
                <TableCell align='left'>{course?.instructor?.name}</TableCell>
                <TableCell align='left'>{course?.start_date}</TableCell>
                <TableCell align='left'>{course?.day}</TableCell>
                <TableCell align='left'>{course?.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={handleClose}>
          Close
        </Button>
      </Box>
    </ModalTemplate>
  );
};

export default UserRegisteredCourseModal;
