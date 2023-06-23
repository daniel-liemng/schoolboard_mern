import { useState } from 'react';
import { TabContext, TabPanel, TabList } from '@mui/lab';
import { Box, Paper, Tab, Typography } from '@mui/material';
import UserTable from '../../compnents/admin/UserTable';
import { useGetAllUsersQuery } from '../../hooks/adminHooks';
import { User } from '../../types/User';

const UsersPage = () => {
  const { data: users } = useGetAllUsersQuery();

  const [value, setValue] = useState('1');

  const adminList = users
    ?.filter((user: User) => user?.role === 'admin')
    .sort();
  const instructorList = users
    ?.filter((user: User) => user.role === 'instructor')
    .sort();
  const userList = users?.filter((user: User) => user?.role === 'user').sort();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: '2rem', height: '100%' }}>
      <Typography variant='h4' align='center' sx={{ mt: '0.5rem', mb: '2rem' }}>
        Manage accounts
      </Typography>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Admin' value='1' />
              <Tab label='Instructors' value='2' />
              <Tab label='Users' value='3' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <UserTable data={adminList} />
          </TabPanel>
          <TabPanel value='2'>
            <UserTable data={instructorList} />
          </TabPanel>
          <TabPanel value='3'>
            <UserTable data={userList} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default UsersPage;
