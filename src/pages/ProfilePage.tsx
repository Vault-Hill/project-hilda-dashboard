import {
	ClipboardDocumentListIcon,
	Cog8ToothIcon,
	LightBulbIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayoutOne from "../components/LayoutOne";
import Loader from "../components/Loader";
import Profile from "../components/Profile";
import { useStorage } from "../hooks/useStorage";
import { MenuItem, NavItem } from "../types";

const menuItems: MenuItem[][] = [
	[
		{
			path: "/settings",
			title: "Settings",
		},
	],
	[
		{
			path: "/login",
			title: "Sign out",
		},
	],
];

const navItems: NavItem[] = [
	{
		title: "Profile",
		path: "/profile",
		active: true,
		icon: UserCircleIcon,
	},
	{
		title: "Reports",
		path: "/reports",
		icon: ClipboardDocumentListIcon,
	},
	{
		title: "Training",
		path: "/training",
		icon: LightBulbIcon,
	},
	{
		title: "Settings",
		path: "/settings",
		icon: Cog8ToothIcon,
	},
];

const ProfilePage = () => {
	const navigate = useNavigate();
	const { getItem: getAuth } = useStorage("session");
	const auth = getAuth("auth");

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["orgData"],
		queryFn: () =>
			fetch(`${import.meta.env.VITE_BASE_URL}/profile`, {
				// credentials: 'include',
				headers: {
					Authorization: `Bearer ${auth?.accessToken}`,
				},
			}).then((res) => res.json()),
		refetchOnWindowFocus: false,
		enabled: false,
	});

	useEffect(() => {
		refetch();
	}, [refetch]);

	if (isLoading || !data) return <Loader />;

	if (error) navigate("/login");

	return (
		<>
			<LayoutOne
				title="Profile"
				menuItems={menuItems}
				navItems={navItems}
				main={<Profile data={data?.data} />}
			/>
		</>
	);
};

export default ProfilePage;
