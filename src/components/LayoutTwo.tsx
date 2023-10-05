import homeImg from "../assets/imgHome.jpeg";

type Props = {
  main: React.ReactNode;
};

const LayoutTwo: React.FC<Props> = ({ main }) => {
  return (
    <div className="flex w-[100vw] h-[100vh] bg-black ">
      <div className=" w-full  relative text-white text-[3rem] leading-[4rem] font-bold hidden md:block">
        <div className="w-[52%] h-[70%] absolute top-0 flex items-center">
          <div className="w-[100%] h-[95%] rounded-[2rem] border border-[#262626]"></div>
        </div>
        <img
          src={homeImg}
          alt="home image"
          className="w-[50%] h-[70%] relative before:border before:w-[150%]"
        />
      </div>
      <div className="w-full bg-black max-w-6xl mx-auto overflow-y-auto px-6">{main}</div>
    </div>
  );
};

export default LayoutTwo;
