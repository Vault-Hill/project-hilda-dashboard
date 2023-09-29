import { MenuItem } from '../types';
import Navbar from './Navbar';
import SideNav from './Sidebar';

type Props = {
  menuItems: MenuItem[][];
  main: React.ReactNode;
};

const LayoutOne: React.FC<Props> = ({ main, menuItems }) => {
  return (
    <>
      <div className='grid grid-rows-7 grid-flow-col bg-[#090909] h-[100vh] relative overflow-auto'>
        <SideNav />
        <Navbar menuItems={menuItems} />
        <div className='row-span-2 col-span-12 overflow-y-auto overflow-x-hidden pl-32'>{main}</div>
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
