import React from 'react';
import { Session } from '../../types/Session';
import ModalTemplate from './ModalTemplate';
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { User } from '../../types/User';

interface SessionDetailsModalProps {
  session: Session;
  isModalOpen: boolean;
  handleClose: () => void;
}

const SessionDetailsModal: React.FC<SessionDetailsModalProps> = ({
  session,
  isModalOpen,
  handleClose,
}) => {
  return (
    <ModalTemplate
      title='Session Details'
      isModalOpen={isModalOpen}
      handleClose={handleClose}
    >
      <Typography variant='h6' sx={{ mt: '1rem' }}>
        Attended students on session: {session?.date}
      </Typography>

      <TableContainer>
        <Table sx={{ minWidth: 500, mt: '1.5rem' }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {session?.attendedStudentIds.map((student: User, index: number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {student?.avatar ? (
                    <img
                      src={student?.avatar}
                      alt='profile'
                      style={{ width: 60, height: 60, borderRadius: '50%' }}
                    />
                  ) : (
                    <Avatar sx={{ width: 30, height: 30 }} />
                  )}
                </TableCell>
                <TableCell align='left'>{student?.name}</TableCell>
                <TableCell align='left'>{student?.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ModalTemplate>
  );
};

export default SessionDetailsModal;
