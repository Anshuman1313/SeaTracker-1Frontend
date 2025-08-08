import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface Props {
  children: React.ReactElement;
}

const EmployeeRoute = ({ children }: Props) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== 'Employee') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default EmployeeRoute;
