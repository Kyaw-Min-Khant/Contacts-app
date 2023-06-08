import React, { useState } from "react";
import { LuUserPlus } from "react-icons/lu";
import { BsPersonFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const Siderbar = () => {
  const side = useSelector((state) => state.light.light);
  const count = useSelector((state) => state.light.users);
  return (
    <div className="bg-[#f7f6f6] dark:bg-gray-600 ">
      <div
        className={
          side
            ? "translate-x-0 ease-in duration-[0.15s] w-[250px] z-[1000] md:z-[1] lg:relative absolute"
            : "translate-x-[-300px] ease-in  duration-[0.15s]  w-0  z-[1000] md:z-[1] lg:relative absolute"
        }
      >
        <div className=" min-h-screen lg:h-[830px] items-center flex gap-y-4 flex-col bg-[#f7f6f6] dark:bg-gray-600">
          <Link to={"/"}>
            <div className=" py-2">
              <h1 className="md:hidden block  text-lg sm:text-xl md:text-2xl font-semibold font-body dark:text-white">
                ConnectX
              </h1>
            </div>
          </Link>
          <div className="py-2">
            <NavLink to="/create">
              <button className="px-2 hover:shadow-lg  shadow-[#484545] duration-[1s] py-1 bg-slate-200 items-center gap-1 font-medium font-serif rounded-md flex ">
                <LuUserPlus />
                Create Contact
              </button>
            </NavLink>
          </div>
          <div className="">
            <NavLink to="/">
              <button className="flex items-center px-4 py-2 rounded hover:bg-slate-200 dark:hover:bg-gray-500 gap-6 justify-around">
                <BsPersonFill className=" dark:text-white" />
                <h2 className=" font-body font-medium  dark:text-white ">
                  Contacts
                </h2>
                <span className="px-2 bg-slate-200 font-mono rounded-full">
                  {count.length}
                </span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Siderbar;
