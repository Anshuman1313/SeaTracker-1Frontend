import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface Props {
  children: React.ReactElement;
}

const AdminRoute = ({ children }: Props) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (userRole !== 'Admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
