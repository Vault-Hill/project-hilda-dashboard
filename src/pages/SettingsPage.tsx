import {
	ClipboardDocumentListIcon,
	Cog8ToothIcon,
	LightBulbIcon,
	UserCircleIcon,
} from "@heroicons/react/24/outline";
import LayoutOne from "../components/LayoutOne";
import Settings from "../components/Settings";
import { MenuItem, NavItem } from "../types";

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
		icon: LightBulbIcon,
	},
	{
		title: "Settings",
		path: "/settings",
		active: true,
		icon: Cog8ToothIcon,
	},
];

const SettingsPage = () => {
	return (
		<LayoutOne
			menuItems={menuItems}
			navItems={navItems}
			title="Access Key"
			main={<Settings />}
		/>
	);
};

export default SettingsPage;
