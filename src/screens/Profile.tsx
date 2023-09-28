import { LinkIcon } from "@heroicons/react/24/outline";
import React from "react";
import avatar from "../assets/avatar.png";
import url from "../assets/url.png";

const Profile = () => {
  return (
    <div className="relative">
      <div className="pl-36">
        <p className="text-4xl text-white mb-10 pt-16">Profile</p>
        <div className="flex gap-10 text-white items-end mb-10">
          <img src={avatar} alt="" />
          <div className="bg-[#FFDA4D] rounded-md px-3 py-2 h-fit text-[14px] text-black">
            Edit Profile
          </div>
        </div>
        <div className="text-[#757575] flex flex-col gap-7 mb-16">
          <div>
            <p>Company Name</p>
            <input
              type="text"
              placeholder="web3"
              name=""
              id=""
              className="outline-none p-3 bg-[#0F0F0F] rounded-md w-[500px] placeholder:text-[#757575]"
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type="email"
              placeholder="web3@gmail.com"
              name=""
              id=""
              className="outline-none p-3 bg-[#0F0F0F] rounded-md w-[500px] placeholder:text-[#757575]"
            />
          </div>
          <div>
            <p>Website </p>
            <div className="w-[500px] bg-[#0F0F0F] flex rounded-md items-center">
              <p className="p-3 border-r border-r-[#1C1C1C] ">http://</p>
              <input
                type="text"
                name=""
                id=""
                className="outline-none p-3  bg-transparent w-full"
              />
            </div>
          </div>
          <div>
            <p>Knowledge base</p>
            <textarea
              name=""
              id=""
              className="outline-none p-3 bg-[#0F0F0F] rounded-md w-[500px] h-[500px] resize-none"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#ffffff26] py-16 px-36">
        <p className="text-4xl text-white font-semibold mb-7">Trusted Websites</p>
        <div className="flex bg-[#0F0F0F] p-3 rounded-md gap-4 w-[500px] items-center">
          <img src={url} alt="" />
          <div className="text-white w-full">
          <p>Website Name</p>
          <p className="text-[#757575]">https://website.com</p>
          </div>
          <LinkIcon className="w-7 h-7 text-[#757575]" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
