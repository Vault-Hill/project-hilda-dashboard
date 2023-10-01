import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import user from '../assets/user.png';
import { useStorage } from '../hooks/useStorage';
import { MenuItem } from '../types';

type Props = {
  menuItems: MenuItem[][];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC<Props> = ({ menuItems }) => {
  const navigate = useNavigate();
  const { removeItem } = useStorage('session');

  return (
    <div className='bg-[#ffffff08] h-fit w-full py-5 flex justify-end border-l border-l-[#ffffff08] px-4 row-span-1 col-span-12'>
      <div className='flex gap-1 bg-[#ffffff08] rounded-full items-center'>
        <div className=' flex text-white p-2  w-fit '>
          <div className='border-r border-r-[#ffffff08] pr-3 mr-3'>65,000 VHC</div>
          <div>accountId</div>
        </div>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button>
              <img src={user} alt='' className='rounded-full w-7 h-7' />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 z-10 mt-7 w-56 origin-top-right divide-y text-neutral-400 divide-neutral-700 rounded-md bg-[#ffffff08] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {menuItems.map((item, index) => {
                return (
                  <div className='py-1' key={index}>
                    {item.map((subItem, index) => {
                      return (
                        <Menu.Item key={index}>
                          {({ active }) => {
                            if (subItem.title === 'Sign out') {
                              return (
                                <button
                                  onClick={() => {
                                    removeItem('auth');
                                    navigate('/login');
                                  }}
                                  className={classNames(
                                    active ? 'text-yellow-400' : '',
                                    'block px-4 py-2 text-sm',
                                  )}
                                >
                                  {subItem.title}
                                </button>
                              );
                            }
                            return (
                              <a
                                href={subItem.path}
                                className={classNames(
                                  active ? 'text-yellow-400' : '',
                                  'block px-4 py-2 text-sm',
                                )}
                              >
                                {subItem.title}
                              </a>
                            );
                          }}
                        </Menu.Item>
                      );
                    })}
                  </div>
                );
              })}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
