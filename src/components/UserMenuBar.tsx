import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { useStorage } from "../hooks/useStorage";
import { MenuItem } from "../types";

type Props = {
  menuItems: MenuItem[][];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const UserMenuBar: React.FC<Props> = ({ menuItems }) => {
  const navigate = useNavigate();
  const { removeItem } = useStorage("session");
  return (
    <Menu as="div" className="text-left ml-5 bg-[#ffffff08]">
      <div className="relative flex justify-center items-center">
        <Menu.Button>
          <img src={user} alt="" className="rounded-full w-10 h-10" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-7 mr-5 w-56 origin-top-right divide-y text-neutral-400 divide-neutral-700 rounded-md bg-[#ffffff08] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ConnectWallet className="!mx-auto !mb-5 !w-full bg-slate-900 pl-4 text-sm uppercase dark:bg-white dark:bg-opacity-10 dark:text-white" />
          {menuItems.map((item, index) => {
            return (
              <div className="py-1" key={index}>
                {item.map((subItem, index) => {
                  return (
                    <Menu.Item key={index}>
                      {({ active }) => {
                        if (subItem.title === "Sign out") {
                          return (
                            <button
                              onClick={() => {
                                removeItem("auth");
                                navigate("/login");
                              }}
                              className={classNames(
                                active ? "text-yellow-400" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {subItem.title}
                            </button>
                          );
                        }
                        return (
                          <a
                            href={subItem.path}
                            className={classNames(
                              active ? "text-yellow-400" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {subItem.title}
                          </a>
                        );
                      }}
                    </Menu.Item>
                  );
                })}
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenuBar;
