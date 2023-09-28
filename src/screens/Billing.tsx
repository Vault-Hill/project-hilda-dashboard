import React from "react";
import visa from "../assets/visa.png";
import { ArrowDownIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";

const Billing = () => {
  return (
    <div className="px-32 h-fit">
      <p className="text-4xl text-white mb-10 pt-16">Billing</p>

      <div className="text-[#757575] flex flex-col gap-7 mb-16">
        <div className="flex justify-between gap-10 [&>*]:rounded-xl [&>*]:w-full [&>*]:p-5 [&>*]:bg-[#0E0E0E] [&>*]:border-[0.5px] [&>*]:border-[#212121]">
          <div className="flex flex-col justify-between">
            <div className="text-white flex items-center gap-3">
              <p className="text-3xl">Plan </p>
              <p className="text-[11px] rounded-full px-2 py-1 text-[#60F678] bg-[#60F67820]">
                Active
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold text-white">
                $400{" "}
                <span className="text-[12px] text-[#757575]">per year</span>
              </p>
              <p className="text-[13px] text-[#FFDA4C]">3 of 12</p>
            </div>
            <div className="flex justify-end border-t-[0.5px] border-t-[#212121] pt-4">
              <button className="rounded-lg px-5 py-2 bg-[#FFDA4C] text-[14px] font-bold text-black">
                Top Up
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <div className="text-xl text-white ">Payment Method</div>
            <div className="flex justify-between rounded-lg border-[0.5px] border-[#212121] p-3 items-center ">
              <div className="flex gap-4">
                <img src={visa} alt="" />
                <div>
                  <div>**** **** **** 9876</div>
                  <div>Expiry 03/2025</div>
                </div>
              </div>
              <div>Details</div>
            </div>
            <div className="flex justify-end pt-4">
              <button className="rounded-lg px-5 py-2 bg-[#ffffff0a] text-[14px] font-bold text-white">
                Edit
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#0E0E0E] [&>*]:border-b-[0.5px] border-[0.5px] [&>*]:border-[#212121] border-[#212121] text-white [&>*]:p-4 rounded-lg">
          <div className="p-4 ">Billing History</div>
          <div className="flex justify-between [&>*]:w-full  gap-1">
            <div>Invoice</div>
            <div>Status</div>
            <div>Billing Date</div>
            <div>Amount</div>
            <div></div>
          </div>
          <div className="flex justify-between [&>*]:w-full  gap-1">
            <div>Invoice #001-Nov,2022</div>
            <div>
              <span className="text-[13px] bg-[#ffffff33] p-2 rounded-full w-fit">
                Paid
              </span>
            </div>
            <div className="text-[#757575]">Nov, 1 2002</div>
            <div>$400</div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center text-[#FFDA4C] bg-[#FFDA4C22] rounded-full w-fit px-2  py-1">
                <ArrowDownIcon className="w-3 h-3" /> <div className="text-[12px]">Download</div>
              </div>
              <EllipsisVerticalIcon className="w-5 h-5"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
