type Props = {
  main: React.ReactNode;
};

const LayoutTwo: React.FC<Props> = ({ main }) => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <div className="bg-black w-full flex justify-center items-center text-white text-[3rem] leading-[4rem] font-bold grid-repeating">
        <div className="h-fit w-[40%] p-7 bg-[#ffffff18] rounded-2xl border-[#ffffff3d] border-[0.5px]">Avoiding Burnout to <br /> Build Performance</div>
      </div>
      <div className="w-full bg-[#D9D9D9] flex justify-center items-center">{main}</div>
    </div>
  );
};

export default LayoutTwo;
