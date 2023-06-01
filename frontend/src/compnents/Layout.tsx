import { Box } from '@mui/material';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ width: '100%', height: '100vh' }}>
      <Navbar />
      <main style={{ height: '100%', paddingTop: '30px', overflowY: 'hidden' }}>
        {children}
      </main>
    </Box>
  );
};

export default Layout;
