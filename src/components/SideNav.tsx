import React from "react";
import { UserCircleIcon, BanknotesIcon, LightBulbIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom";
const SideNav = () => {
  const path = useLocation()
  console.log(path.pathname)
  return (
    <div className="bg-[#ffffff08] px-16 h-full row-span-3 w-full">
      <p className="py-7 text-2xl text-white mb-7">Hilda</p>
      <div className="text-[#757575] flex flex-col gap-7 [&>*:hover]:text-[#FFDA4D] [&>*:hover]:cursor-pointer">
        
        <Link to='/' className={`flex gap-2 ${path.pathname === '/' ? 'text-[#FFDA4D]' : ''}`}>
          <UserCircleIcon className="h-5 w-5"/>
          <p>Profile</p>
        </Link>
        <Link to='billing' className={`flex gap-2 ${path.pathname === '/billing' ? 'text-[#FFDA4D]' : ''}`}>
          <BanknotesIcon className="h-5 w-5"/>
          <p>Billing</p>
        </Link>
        <Link to='training' className={`flex gap-2 ${path.pathname === '/training' ? 'text-[#FFDA4D]' : ''}`}>
          <LightBulbIcon className="h-5 w-5"/>
          <p>Training</p>
        </Link>
        <Link to='settings' className={`flex gap-2 ${path.pathname === '/settings' ? 'text-[#FFDA4D]' : ''}`}>
          <Cog8ToothIcon className="h-5 w-5"/>
          <p>Settings</p>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
