import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './UserAuth';

export const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicOnlyRoute = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to="/" replace />

};