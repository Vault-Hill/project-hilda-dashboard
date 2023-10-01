import { cx } from 'class-variance-authority';
import { NavItem } from '../types';

type Props = {
  navItems?: NavItem[];
};
const SideNav: React.FC<Props> = ({ navItems }) => {
  return (
    <div className='bg-[#ffffff08] px-16 h-full row-span-3'>
      <p className='py-7 text-2xl text-white mb-7'>Hilda</p>

      <nav className='flex flex-col gap-5 text-neutral-400'>
        {navItems?.map((item, index) => (
          <a key={index} href={item.path}>
            <div className={cx('flex gap-3 items-center', { 'text-amber-300': item.active })}>
              <item.icon className='h-6 w-6' />
              <p className='text-lg'>{item.title}</p>
            </div>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default SideNav;
