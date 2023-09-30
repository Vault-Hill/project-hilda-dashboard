/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import { useStorage } from './hooks/useStorage';
import SettingsPage from './pages/SettingsPage';

const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

const RenderRoute = ({
  protectedRoute,
  children,
}: {
  protectedRoute?: boolean;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const { getItem: getAuth } = useStorage('session');
  const auth = getAuth('auth');

  if (protectedRoute) {
    if (!auth) {
      return <Navigate to='/login' replace state={{ from: location }} />;
    }
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: '/profile',
    element: (
      <RenderRoute protectedRoute>
        <ProfilePage />
      </RenderRoute>
    ),
  },
  {
    path: '/settings',
    element: <RenderRoute >{<SettingsPage />}</RenderRoute>,
  },
  {
    path: '/login',
    element: (
      <RenderRoute>
        <LoginPage />
      </RenderRoute>
    ),
  },
]);

export default router;
