import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { User } from '../../types/User';
import UserInfoModal from '../modal/UserInfoModal';
import {
  useDeleteUserMutation,
  useResetPasswordMutation,
} from '../../hooks/adminHooks';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Delete } from '@mui/icons-material';
import DeleteModal from '../modal/DeleteModal';
import ResetPasswordModal from '../modal/ResetPasswordModal';
import ChangeRoleModal from '../modal/ChangeRoleModal';

interface UserTableProps {
  data: User[];
}

const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);
  const [isChangeRoleModalOpen, setIsChangeRoleModalOpen] = useState(false);

  const {
    mutateAsync: resetPassword,
    isLoading: isResetLoading,
    error: resetError,
  } = useResetPasswordMutation();

  const {
    mutateAsync: deleteUser,
    isLoading: isDeleteLoading,
    error: deleteError,
  } = useDeleteUserMutation();

  const handleResetPassword = async (userId: string) => {
    await resetPassword(userId);

    toast.success('Password reset');
    setIsResetPassModalOpen(false);
  };
  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId);

    toast.success(
      'Deleted user and its all related data in Course and Session'
    );
    setIsDeleteUserModalOpen(false);
  };

  if (resetError instanceof AxiosError) {
    toast.error(resetError?.response?.data?.message || 'Something went wrong');
  }

  if (deleteError instanceof AxiosError) {
    toast.error(deleteError?.response?.data?.message || 'Something went wrong');
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='left'>Email</TableCell>
            <TableCell align='left'>Role</TableCell>
            <TableCell align='left'>Gender</TableCell>
            <TableCell align='left'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((user: User, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {user?.name}
              </TableCell>
              <TableCell align='left'>{user?.email}</TableCell>
              <TableCell align='left' sx={{ textTransform: 'capitalize' }}>
                {user?.role}
              </TableCell>
              <TableCell align='left'>
                {user?.gender?.slice(0, 1).toUpperCase()}
              </TableCell>
              <TableCell align='left'>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <Button
                    type='button'
                    onClick={() => {
                      setSelectedUser(user);
                      setIsUserInfoModalOpen(true);
                    }}
                    variant='contained'
                    size='small'
                    sx={{ mr: '0.5rem' }}
                  >
                    Details
                  </Button>
                  <UserInfoModal
                    user={selectedUser}
                    isModalOpen={isUserInfoModalOpen}
                    handleClose={() => setIsUserInfoModalOpen(false)}
                  />

                  <Button
                    variant='contained'
                    size='small'
                    color='secondary'
                    sx={{ mr: '0.5rem' }}
                  >
                    Update
                  </Button>

                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDeleteUserModalOpen(true);
                    }}
                    variant='contained'
                    size='small'
                    color='error'
                  >
                    Delete
                  </Button>
                  <DeleteModal
                    isModalOpen={isDeleteUserModalOpen}
                    handleClose={() => setIsDeleteUserModalOpen(false)}
                    handleDelete={() =>
                      handleDeleteUser(selectedUser?._id as string)
                    }
                    type='user'
                    title={`${selectedUser?.name} and its all related data`}
                    isLoading={isDeleteLoading}
                  />

                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsResetPassModalOpen(true);
                    }}
                    variant='contained'
                    size='small'
                    color='success'
                    disabled={isResetLoading}
                  >
                    Reset password
                  </Button>
                  <ResetPasswordModal
                    isModalOpen={isResetPassModalOpen}
                    handleClose={() => setIsResetPassModalOpen(false)}
                    handleReset={() =>
                      handleResetPassword(selectedUser?._id as string)
                    }
                    user={selectedUser}
                  />

                  <Button
                    onClick={() => {
                      setSelectedUser(user);
                      setIsChangeRoleModalOpen(true);
                    }}
                    variant='contained'
                    size='small'
                    color='info'
                  >
                    Set role
                  </Button>
                  <ChangeRoleModal
                    isModalOpen={isChangeRoleModalOpen}
                    handleClose={() => setIsChangeRoleModalOpen(false)}
                    user={selectedUser}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
