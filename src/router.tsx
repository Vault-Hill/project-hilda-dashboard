/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import { useStorage } from './hooks/useStorage';

const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const RenderRoute = ({
  protectedRoute,
  children,
}: {
  protectedRoute: boolean;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const { getItem } = useStorage('local');

  if (protectedRoute) {
    const auth = getItem('auth');

    if (!auth) {
      return <Navigate to='/login' replace state={{ from: location }} />;
    }
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/profile',
    element: <RenderRoute protectedRoute>{<ProfilePage />}</RenderRoute>,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default router;
