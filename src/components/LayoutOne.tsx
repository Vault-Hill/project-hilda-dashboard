import { MenuItem, NavItem } from "../types";
import Navbar from "./Navbar";
import SideNav from "./Sidebar";
import ThemeToggle from "./ThemeToggle";
import UserMenuBar from "./UserMenuBar";

type Props = {
	menuItems: MenuItem[][];
	navItems?: NavItem[];
	main: React.ReactNode;
	title: string;
};

const LayoutOne: React.FC<Props> = ({ main, menuItems, navItems, title }) => {
	return (
		<>
			<div className="grid grid-rows-7 grid-flow-col dark:bg-[#090909] bg-white h-[100vh] relative overflow-auto">
				<SideNav navItems={navItems} />
				<div className="row-span-3 col-span-13 overflow-y-auto overflow-x-hidden ">
					<Navbar menuItems={menuItems} />
					<div className="px-6">
						<div className="flex justify-between my-10 items-center">
							<p className="text-3xl dark:text-white text-black font-bold prototype">
								{title}
							</p>
							<div className="flex md:hidden">
								<ThemeToggle />
								<UserMenuBar menuItems={menuItems} />
							</div>
						</div>
						{main}
					</div>
				</div>
			</div>
			{/* <div className="flex p-4 fixed bottom-0 bg-[#171717] justify-between text-[#ffffff99] w-full text-[14px]">
        <p>© 2023 Hilda • All Rights Reserved</p>
        <div className="flex gap-4  [&>*:hover]:cursor-pointer">
        <div>Privacy Policy</div>
        <div>Terms Of Service</div>
        </div>
      </div> */}
		</>
	);
};

export default LayoutOne;
