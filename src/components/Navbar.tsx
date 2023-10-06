
import { MenuItem } from '../types';
import ThemeToggle from './ThemeToggle';
import UserMenuBar from './UserMenuBar';

type Props = {
  menuItems: MenuItem[][];
};



const Navbar: React.FC<Props> = ({ menuItems }) => {


  return (
    <div className='dark:bg-[#ffffff08] bg-[#F0F0F0] h-fit w-full py-5 md:flex hidden justify-end border-l dark:border-l-[#ffffff08] border-l-[#0000002a]  px-4 row-span-1 col-span-12'>
      <div className='flex gap-1  rounded-full items-center'>
        <ThemeToggle/>
        <UserMenuBar menuItems={menuItems}/>
        
      </div>
    </div>
  );
};

export default Navbar;
