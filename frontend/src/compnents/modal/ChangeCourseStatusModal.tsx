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
import ModalTemplate from './ModalTemplate';
import { useChangeCourseStatusMutation } from '../../hooks/adminHooks';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Course } from '../../types/Course';

interface ChangeCourseStatusModalProps {
  isModalOpen: boolean;
  handleClose: () => void;
  course: Course | undefined;
}

const ChangeCourseStatusModal: React.FC<ChangeCourseStatusModalProps> = ({
  isModalOpen,
  handleClose,
  course,
}) => {
  const [selectedStatus, setSelectedStatus] = useState('');

  const {
    mutateAsync: changeStatus,
    isLoading,
    error,
  } = useChangeCourseStatusMutation();

  const handleChangeStatus = async () => {
    await changeStatus({ courseId: course?._id, status: selectedStatus });
    setSelectedStatus('');

    toast.success('Status changed!');
    handleClose();
  };

  if (error instanceof AxiosError) {
    toast.error(error?.response?.data?.message || 'Something went wrong');
  }

  return (
    <ModalTemplate
      title='Change course status'
      isModalOpen={isModalOpen}
      handleClose={handleClose}
    >
      <Box sx={{ mt: '1.5rem' }}>
        <Typography variant='body1' sx={{ mb: '1.5rem' }}>
          Change status for course: {course?.title} from{' '}
          <strong>{course?.status}</strong> to <strong>{selectedStatus}</strong>
        </Typography>
        <FormControl fullWidth>
          <InputLabel id='role'>Select status</InputLabel>
          <Select
            labelId='role'
            label='Select Role'
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <MenuItem disabled>Select a user role</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
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
            onClick={handleChangeStatus}
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

export default ChangeCourseStatusModal;
