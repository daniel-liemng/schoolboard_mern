import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

const AdminProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  if (!user && !isAuthenticated) {
    return <Navigate to='/login' replace />;
  } else if (user.role !== 'admin') {
    return <Navigate to='/' replace />;
  }
  return children;
};

export default AdminProtectedRoute;
