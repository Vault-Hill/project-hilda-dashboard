import { useNavigate } from "react-router-dom";

const Training = () => {
    const navigate = useNavigate()
	return (
		<div className="flex flex-col">
			<div className="flex items-center gap-x-2">
				<button onClick={() => navigate('text')} className="px-3 py-2 rounded-md w-fit text-[14px] font-semibold bg-black text-white dark:bg-white dark:text-black">
					Add Text
				</button>

				<button onClick={() => navigate('link')} className="px-3 py-2 rounded-md w-fit text-[14px] font-semibold bg-black text-white dark:bg-white dark:text-black">
					Add Links
				</button>
			</div>
		</div>
	);
};

export default Training;
