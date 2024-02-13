import { cx } from 'class-variance-authority';
import { NavItem } from '../types';

type Props = {
  navItems?: NavItem[];
};
const SideNav: React.FC<Props> = ({ navItems }) => {
  return (
    <div className='dark:bg-[#0D0D0D] bg-[#F0F0F0] px-10 md:h-full row-span-3 py-5 fixed w-full md:w-auto bottom-0  z-50 md:relative border-r dark:border-r-[#ffffff] border-r-[#0000002a]'>
      <p className='py-7 text-2xl dark:text-white text-black mb-7 md:block hidden prototype'>Hilda</p>

      <nav className='flex md:flex-col justify-around md:justify-normal gap-5 dark:text-neutral-400 text-neutral-600'>
        {navItems?.map((item, index) => (
          <a key={index} href={item.path}>
            <div className={cx('flex flex-col md:flex-row md:gap-3 gap-1 items-center', { 'gradient-text': item.active })}>
              <item.icon className='h-6 w-6 gradient-text' />
              <p className='text-lg'>{item.title}</p>
            </div>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
