import homeImg from "../assets/imgHome.png";
import ThemeToggle from "./ThemeToggle";
import vhlogo from "../assets/vhlogo-text.png"

type Props = {
  main: React.ReactNode;
};

const LayoutTwo: React.FC<Props> = ({ main }) => {
  return (
    <div className="flex w-[100vw] h-[100vh] dark:bg-black bg-white ">
      <div className=" w-full  relative bg-red text-white text-[3rem] leading-[4rem] font-bold hidden md:block">
        <div className="h-auto relative">
          <div className="w-[58%] h-full absolute top-0 flex items-center">
            <div className="w-[102%] absolute h-[95%] rounded-[2rem] border border-[#262626]"></div>

            <p className="absolute prototype top-[60%] left-[50%] translate-x-[-50%] self-center z-[999] bg-[#00000060] w-[90%] text-center p-12 text-white text-4xl rounded-3xl">
              AI Meets Humanity
            </p>
          </div>
          <img
            src={homeImg}
            alt="home image"
            className=" w-[58%] relative rounded-e-[2rem]"
          />
          <img src={vhlogo} alt="" className="absolute top-5 left-5" />
        </div>
      </div>
      <div className="w-full  max-w-6xl mx-auto overflow-y-auto p-6 flex flex-col items-end">
        <ThemeToggle />
        {main}
      </div>
    </div>
  );
};

export default LayoutTwo;
