import React from "react";
import user from '../assets/user.png'

const Nav = () => {
  return (
    <div className="bg-[#ffffff08] h-fit w-full py-5 flex justify-end border-l border-l-[#ffffff08] px-4 row-span-1 col-span-12 ">
      <div className="flex gap-1 bg-[#ffffff08] rounded-full items-center">
      <div className=" flex text-white p-2  w-fit ">
        <div className="border-r border-r-[#ffffff08] pr-3 mr-3">65,000 VHC</div>
        <div>accountId</div>
      </div>
      <img src={user} alt=""  className="rounded-full w-7 h-7"/>
      </div>
    </div>
  );
};

export default Nav;
