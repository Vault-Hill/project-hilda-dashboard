/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { Navigate, createBrowserRouter, useLocation } from 'react-router-dom';
import { useStorage } from './hooks/useStorage';

const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));

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
    element: (
      <RenderRoute protectedRoute>
        <SettingsPage />
      </RenderRoute>
    ),
  },
  {
    path: '/login',
    element: (
      <RenderRoute>
        <LoginPage />
      </RenderRoute>
    ),
  },
  {
    path: '/onboarding',
    element: (
      <RenderRoute>
        <OnboardingPage />
      </RenderRoute>
    ),
  },
  {
    path: '/',
    element: (
      <RenderRoute>
        <LandingPage />
      </RenderRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to='/profile' replace />,
  },
]);

export default router;
