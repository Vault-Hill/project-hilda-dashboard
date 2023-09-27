import React from "react";
import { UserCircleIcon, BanknotesIcon, LightBulbIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
const SideNav = () => {
  return (
    <div className="bg-[#ffffff08] px-16 h-full row-span-3">
      <p className="py-7 text-2xl text-white mb-7">Hilda</p>
      <div className="text-[#757575] flex flex-col gap-5 [&>*:hover]:text-[#FFDA4D] [&>*:hover]:cursor-pointer">
        <div className="flex gap-2">
          <UserCircleIcon className="h-5 w-5"/>
          <p>Profile</p>
        </div>
        <div className="flex gap-2">
          <BanknotesIcon className="h-5 w-5"/>
          <p>Billing</p>
        </div>
        <div className="flex gap-2">
          <LightBulbIcon className="h-5 w-5"/>
          <p>Training</p>
        </div>
        <div className="flex gap-2">
          <Cog8ToothIcon className="h-5 w-5"/>
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
