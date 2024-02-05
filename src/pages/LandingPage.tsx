import logo from "/vault_hill_logo.svg";
import ThemeToggle from "../components/ThemeToggle";
import star from "/star.svg";
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const navigate = useNavigate();
	return (
		<div className="bg-white dark:bg-black h-screen w-screen">
			<div className="h-screen w-screen relative overflow-hidden px-4 pt-[10%] lg:pt-[5%] md:px-[4%] lg:px-[8%] landing-background dark:dark-landing-background">
				<img
					src={star}
					className="absolute top-[10%] lg:top-[8%] left-4 lg:left-[10%] max-h-[73px] max-w-[70px] lg:max-h-[131px] lg:max-w-[126px]"
				/>
				<img
					src={star}
					className="absolute top-[35%] lg:top-[20%] right-4 lg:right-[10%] max-h-[73px] max-w-[70px] lg:max-h-[131px] lg:max-w-[126px]"
				/>
				<img
					src={star}
					className="absolute bottom-[20%] lg:bottom-[30%] left-4 lg:left-[10%] max-h-[73px] max-w-[70px] lg:max-h-[131px] lg:max-w-[126px]"
				/>
				<div className="flex justify-between items-center">
					<h1 className="font-normal text-3xl lg:ext-4xl dark:text-white">
						Hilda
					</h1>
					<ThemeToggle />
				</div>
				<div className="mt-[30%] lg:mt-[8%] justify-center items-center flex flex-col">
					<h1 className="text-6xl lg:text-7xl bg-clip-text text-center text-transparent background-text-gradient">
						AI Meets Humanity
					</h1>
					<span className="font-medium font-['AvenirLTPro'] text-[25px] dark:text-[#E0E0FD] mt-4 lg:mt-[84px]">
						Get Started
					</span>
					<div className="flex flex-col lg:flex-row space-y-5 lg:space-x-5 lg:space-y-0 mt-9 px-4 w-full items-center justify-center">
						<button
							type="submit"
							onClick={() => navigate("onboarding")}
							className="w-full bg-[#47E2BD] font-bold py-4 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
						>
							Sign up
						</button>
						<button
							type="submit"
							onClick={() => navigate("login")}
							className="w-full bg-[#47E2BD] font-bold py-4 rounded-full disabled:opacity-40 disabled:cursor-not-allowed"
						>
							Sign in
						</button>
					</div>
				</div>
			</div>
			<div className="w-screen justify-center items-center flex fixed bottom-[8%]">
				<span className="text-[#B5B2B2] font-thin font-['AvenirLTPro']">
					By
				</span>
				<img src={logo} className="mx-[5px]" />
				<span className="text-black dark:text-white">Vault Hill</span>
			</div>
		</div>
	);
};

export default Landing;
