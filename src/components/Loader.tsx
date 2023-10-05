import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="bg-black h-[100vh] w-[100vw] flex items-center justify-center gap-4 text-white text-xl">
      <BallTriangle
        height={70}
        width={70}
        radius={5}
        color="#FB7BF2"
        ariaLabel="ball-triangle-loading"
        
        visible={true}
      />
      Loading
    </div>
  );
};

export default Loader;
