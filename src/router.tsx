/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import { useStorage } from "./hooks/useStorage";

// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import OnboardingPage from './pages/OnboardingPage';
// import ProfilePage from './pages/ProfilePage';
// import ReportPage from './pages/ReportPage';
// import SettingsPage from './pages/SettingsPage';

const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));

const RenderRoute = ({
	protectedRoute,
	children,
}: {
	protectedRoute?: boolean;
	children: React.ReactNode;
}) => {
	const location = useLocation();
	const { getItem: getAuth } = useStorage("session");
	const auth = getAuth("auth");

	if (protectedRoute) {
		if (!auth) {
			return <Navigate to="/login" replace state={{ from: location }} />;
		}
	}

	return <>{children}</>;
};

const router = createBrowserRouter([
	{
		path: "/profile",
		element: (
			<RenderRoute protectedRoute>
				<ProfilePage />
			</RenderRoute>
		),
	},
	{
		path: "/settings",
		element: (
			<RenderRoute protectedRoute>
				<SettingsPage />
			</RenderRoute>
		),
	},
	{
		path: "/login",
		element: (
			<RenderRoute>
				<LoginPage />
			</RenderRoute>
		),
	},
	{
		path: "/onboarding",
		element: (
			<RenderRoute>
				<OnboardingPage />
			</RenderRoute>
		),
	},
	{
		path: "/reports",
		element: (
			<RenderRoute protectedRoute>
				<ReportPage />
			</RenderRoute>
		),
	},
	{
		path: "/training",
		element: (
			<RenderRoute protectedRoute>
				<TrainingPage />
			</RenderRoute>
		),
	},
  {
		path: "/training/text",
		element: (
			<RenderRoute protectedRoute>
				<TrainingPage />
			</RenderRoute>
		),
	},
  {
		path: "/training/link",
		element: (
			<RenderRoute protectedRoute>
				<TrainingPage />
			</RenderRoute>
		),
	},
	{
		path: "/",
		element: (
			<RenderRoute>
				<LandingPage />
			</RenderRoute>
		),
	},
	{
		path: "*",
		element: <Navigate to="/profile" replace />,
	},
]);

export default router;
