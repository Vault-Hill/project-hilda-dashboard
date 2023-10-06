import React from 'react'
import sun from "../assets/sun.svg";
import night from "../assets/night.svg";

const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    console.log('dark')
  };
const ThemeToggle = () => {
  return (
    <div
          className="relative dark:bg-[#ffffff1a] bg-[#0000001a] rounded-full flex p-2 gap-2 w-fit cursor-pointer dark-toggle"
          onClick={toggleDark}
        >
          <div className="dark:bg-white bg-black h-7 z-0 w-7 mr-2 rounded-full absolute dark:right-[calc(100%-2.25rem)] dark:ml-2 dark:mr-0 transition-[.5s] right-0"></div>
          <div className="z-10">
            <img src={night} className="h-7 w-7  rounded-full p-1" />
          </div>
          <div className="z-10">
            <img src={sun} className="h-7 w-7 rounded-full p-1" />
          </div>
        </div>
  )
}

export default ThemeToggle