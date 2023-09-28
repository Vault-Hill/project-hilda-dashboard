import React from "react";


const Settings = () => {
  return (
      <div className="pl-36 h-[75vh]">
        <p className="text-4xl text-white mb-10 pt-16">Settings</p>
        
        <div className="text-[#757575] flex flex-col gap-7 mb-16">
          
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
            <p>Password</p>
            <input
              type="password"
              placeholder="• • • • • • • • • • "
              name=""
              id=""
              className="outline-none p-3 bg-[#0F0F0F] rounded-md w-[500px] placeholder:text-[#757575] tracking-wide"
            />
          </div>
         <button className="px-3 py-2 bg-white rounded-md w-fit text-[14px] font-semibold text-black">Change Password</button>
        </div>
      </div>
      
  );
};

export default Settings;
