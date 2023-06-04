import { useEffect } from 'react';
import { Box } from '@mui/material';

import Navbar from './Navbar';
import { useGetCurrentUserQuery } from '../hooks/userHooks';
import { useAppDispatch } from '../hooks/hooks';
import { setAuth, setCurrentUser } from '../redux/userSlice';
// import { AxiosError } from 'axios';
// import { toast } from 'react-hot-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const { data } = useGetCurrentUserQuery();

  useEffect(() => {
    if (data) {
      dispatch(setAuth());
      const { _id, name, email, phone, gender, dob } = data;
      dispatch(setCurrentUser({ _id, name, email, phone, gender, dob }));
    }
  }, [dispatch, data]);

  // if (error instanceof AxiosError) {
  //   toast.error(error?.response?.data?.message || 'Something went wrong');
  // }

  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Navbar />
      <main style={{ height: '100%', paddingTop: '65px', overflowY: 'hidden' }}>
        {children}
      </main>
    </Box>
  );
};

export default Layout;
