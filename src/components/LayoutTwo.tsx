import ThemeToggle from "./ThemeToggle";
import vhlogo from "../assets/vhlogo-text.png";

type Props = {
	main: React.ReactNode;
};

const LayoutTwo: React.FC<Props> = ({ main }) => {
	return (
		<div className="w-screen min-h-screen h-full lg:h-screen justify-center items-center lg:items-start flex flex-col lg:flex-row overflow-hidden">
			<div className="hidden w-5/12 h-full relative bg-[url('./assets/hilda_background.png')] bg-[50%] bg-cover bg-no-repeat flex-col lg:flex rounded-r-2xl">
				<div className="flex justify-start items-center absolute top-[4%] space-x-1 left-[7%]">
					<img src={vhlogo} />
				</div>
				<div className="absolute bottom-[16%] w-[80%] m-auto left-0 right-0 rounded-2xl bg-black bg-opacity-60 py-[80px] px-[66px] flex justify-center items-center">
					<h1 className="text-white text-center text-[50px]">
						AI Meets Humanity
					</h1>
				</div>
				<div className="absolute -right-[2%] top-0 bottom-0 rounded-full border-r border-[#DCDCDC] dark:border-[#262626] h-[97%] w-[5%] m-auto" />
			</div>

			<div className="w-full xl:max-w-6xl mx-auto px-4 lg:px-32 py-16 lg:w-7/12 h-full flex flex-col overflow-y-scroll overflow-x-hidden">
				<div className="flex justify-end">
					<ThemeToggle />
				</div>
				{main}
			</div>
		</div>
	);
};

export default LayoutTwo;
