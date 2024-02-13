import {
	ClipboardDocumentListIcon,
	Cog8ToothIcon,
	UserCircleIcon,
	LightBulbIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutOne from "../components/LayoutOne";
import Loader from "../components/Loader";
import { useStorage } from "../hooks/useStorage";
import { MenuItem, NavItem } from "../types";
import TrainingText from "../components/TrainingText";
import Training from "../components/Training";
import TrainingLink from "../components/TrainingLink";

const menuItems: MenuItem[][] = [
	[
		{
			path: "/",
			title: "Settings",
		},
	],
	[
		{
			path: "/",
			title: "Sign out",
		},
	],
];

const navItems: NavItem[] = [
	{
		title: "Profile",
		path: "/profile",
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
		active: true,
		icon: LightBulbIcon,
	},
	{
		title: "Settings",
		path: "/settings",
		icon: Cog8ToothIcon,
	},
];

const TrainingPage = () => {
	const path = useLocation().pathname;
	const navigate = useNavigate();
	const { getItem: getAuth } = useStorage("session");
	const auth = getAuth("auth");
	let rendered;

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

	switch (path) {
		case "/training/text":
			rendered = <TrainingText data={data?.data} />;
			break;
		case "/training/link":
			rendered = <TrainingLink data={data?.data} />;
			break;
		default:
			rendered = <Training />;
	}
	return (
		<LayoutOne
			menuItems={menuItems}
			navItems={navItems}
			title="Training"
			main={rendered}
		/>
	);
};

export default TrainingPage;
