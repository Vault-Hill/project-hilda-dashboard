import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Nav from "./Nav";
import SideNav from "./SideNav";
import Profile from "../screens/Profile";
import Settings from "../screens/Settings";
import Billing from "../screens/Billing";
import Training from "../screens/Training";

const Layout = () => {
  return (
    <Router>
      <div className="grid grid-rows-7 grid-flow-col bg-[#090909] h-[100vh] relative overflow-auto">
        <SideNav />
        <Nav />
        <div className="row-span-2 col-span-12 h-full overflow-y-auto overflow-x-hidden self-start">
          <Routes>
            <Route path="/" Component={Profile} />
            <Route path="settings" Component={Settings} />
            <Route path="billing" Component={Billing} />
            <Route path="training" Component={Training} />

          </Routes>
        </div>
      </div>
      <div className="flex p-4 fixed bottom-0 bg-[#171717] justify-between text-[#ffffff99] w-full text-[14px]">
        <p>© 2023 Hilda • All Rights Reserved</p>
        <div className="flex gap-4  [&>*:hover]:cursor-pointer">
          <div>Privacy Policy</div>
          <div>Terms Of Service</div>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
