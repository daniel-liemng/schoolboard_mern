import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { User } from '../../types/User';
import ModalTemplate from './ModalTemplate';
import { useChangeRoleMutation } from '../../hooks/adminHooks';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ChangeRoleModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  user: User | undefined;
}

const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  isModalOpen,
  handleClose,
  user,
}) => {
  const [selectedRole, setSelectedRole] = useState('');

  const { mutateAsync: changeRole, isLoading, error } = useChangeRoleMutation();

  const handleChangeRole = async () => {
    await changeRole({ userId: user?._id, role: selectedRole });

    toast.success('Role changed!');
    handleClose();
  };

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  return (
    <ModalTemplate
      title='Change user role'
      isModalOpen={isModalOpen}
      handleClose={handleClose}
    >
      <Box sx={{ mt: '1.5rem' }}>
        <Typography variant='body1' sx={{ mb: '1.5rem' }}>
          Change role for user: {user?.name} from <strong>{user?.role}</strong>{' '}
          to <strong>{selectedRole}</strong>
        </Typography>
        <FormControl fullWidth>
          <InputLabel id='role'>Select Role</InputLabel>
          <Select
            labelId='role'
            label='Select Role'
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <MenuItem disabled>Select a user role</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='instructor'>Instructor</MenuItem>
            <MenuItem value='user'>User</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <Button
            type='button'
            onClick={handleClose}
            variant='contained'
            color='secondary'
            disableElevation
            size='large'
            sx={{ marginTop: '1rem' }}
          >
            Cancel
          </Button>
          <Button
            type='button'
            onClick={handleChangeRole}
            variant='contained'
            disableElevation
            size='large'
            disabled={isLoading}
            sx={{ marginTop: '1rem' }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </ModalTemplate>
  );
};

export default ChangeRoleModal;
