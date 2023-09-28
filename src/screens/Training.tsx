import React, { useRef } from "react";
import Xarrow from "react-xarrows";

const Training = () => {

  const pipe3 = useRef(null)
  const pipe4 = useRef(null)
  return (
    <div className="px-24 h-[75vh] mb-36">
      <p className="text-4xl text-white mb-10 pt-16">Training</p>
      <button className="rounded-lg px-16 py-2 bg-[#FFDA4C]  font-bold text-black">
        Train
      </button>

      <div className="text-[#757575] flex flex-col gap-7 mb-16 pt-16">
        <p className="text-2xl text-white mb-10 ">Training Pipeline</p>
        <div className="flex [&>*]:w-[300px]   gap-x-32 gap-y-20 [&>*]:rounded-xl flex-wrap text-white [&>*]:px-3 [&>*]:py-5 [&>*]:flex [&>*]:flex-col [&>*]:gap-4">
          <div className="bg-[#0E2C2C]" id="p1">
            <p>Pipeline 1</p>
            <div className="bg-[#ffffff20] h-4 w-full rounded-full">
              <div className="bg-[#ffffff80] h-full w-[100%] rounded-full text-right text-[13px] text-black pr-4">
                100%
              </div>
            </div>
          </div>
          <div className="bg-[#341C20]" id="p2">
            <p>Pipeline 2</p>
            <div className="bg-[#ffffff20] h-4 w-full rounded-full">
              <div className="bg-[#ffffff80] h-full w-[78%] rounded-full text-right text-[13px] text-black pr-4">
                78%
              </div>
            </div>
          </div>
          <div className="bg-[#16183C]" ref={pipe3}>
            <p>Pipeline 3</p>
            <div className="bg-[#ffffff20] h-4 w-full rounded-full">
              <div className="bg-[#ffffff80] h-full w-[62%] rounded-full text-right text-[13px] text-black pr-4">
                62%
              </div>
            </div>
          </div>
          <div className="bg-[#322822]" ref={pipe4}>
            <p>Pipeline 4</p>
            <div className="bg-[#ffffff20] h-4 w-full rounded-full">
              <div className="bg-[#ffffff80] h-full w-[41%] rounded-full text-right text-[13px] text-black pr-4">
                41%
              </div>
            </div>
          </div>
          <div className="bg-[#2A1C3A]" id="p5">
            <p>Pipeline 5</p>
            <div className="bg-[#ffffff20] h-4 w-full rounded-full">
              <div className="bg-[#ffffff80] h-full w-[20%] rounded-full text-right text-[13px] text-black pr-4">
                20%
              </div>
            </div>
          </div>
          <div className="bg-[#0A2A44]" id="p6">
            <p>Pipeline 6</p>
            <div className="bg-[#ffffff20] h-4 w-full rounded-full">
              <div className="bg-[#ffffff80] h-full w-[5%] rounded-full text-right text-[13px] text-black pr-4">
                0%
              </div>
            </div>
          </div>
          <Xarrow
          start={pipe3}
          end={pipe4}
          dashness
          color="#ffffff70"
          strokeWidth={2}
          startAnchor='bottom'
          endAnchor='top'
          curveness={0}
          path="grid"
          // gridBreak="10%"
          />
          <Xarrow
          start="p1"
          end="p2"
          dashness
          color="#ffffff70"
          strokeWidth={2}
          startAnchor='right'
          endAnchor='left'
          curveness={0}
          path="grid"
          // gridBreak="10%"
          />
          <Xarrow
          start="p2"
          end={pipe3}
          dashness
          color="#ffffff70"
          strokeWidth={2}
          startAnchor='right'
          endAnchor='left'
          curveness={0}
          path="grid"
          // gridBreak="10%"
          />
          <Xarrow
          start={pipe4}
          end="p5"
          dashness
          color="#ffffff70"
          strokeWidth={2}
          startAnchor='right'
          endAnchor='left'
          curveness={0}
          path="grid"
          // gridBreak="10%"
          />
          <Xarrow
          start="p5"
          end="p6"
          dashness
          color="#ffffff70"
          strokeWidth={2}
          startAnchor='right'
          endAnchor='left'
          curveness={0}
          path="grid"
          // gridBreak="10%"
          />
        </div>
      </div>
    </div>
  );
};

export default Training;
