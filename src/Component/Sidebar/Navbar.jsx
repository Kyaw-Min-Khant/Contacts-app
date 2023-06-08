import React, { useEffect, useState } from "react";
import { UseCustomProvider } from "../../Context/DarkMoodContext";
import { BsFillSunFill, BsFillMoonStarsFill, BsPerson } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSearchAlt2 } from "react-icons/bi";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, lightToggle, removeUser } from "../../app/LightSlice";
import Cookies from "js-cookie";
import { AiOutlineMail } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useLogoutMutation } from "../../app/Authapi";

import { Menu } from "@mantine/core";

const Navbar = () => {
  const { darkMode, handleThemeSwitch } = UseCustomProvider();
  const [search, setSearch] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    nav("/search", { state: { search } });
    setSearch("");
  };
  const userInfo = JSON.parse(Cookies?.get("Info"));
  const name = userInfo.name;
  const email = userInfo.email;
  const side = useSelector((state) => state.light.light);

  const [opened, setOpened] = useState(false);
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const token = Cookies.get("User");

  const logoutHandler = async () => {
    const { data } = await logout(token);
    try {
      if (data.success) {
        nav("/login");
        dispatch(removeUser());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-3 dark:bg-gray-800 ">
      <div className="md:px-0 px-1 container mx-auto flex justify-between items-center">
        <div className=" flex items-center gap-1 md:gap-3">
          <button
            onClick={() => dispatch(lightToggle(!side))}
            className={
              side
                ? "bg-[#e4e0e087] flex items-center justify-center w-10 h-10  rounded-[5rem] nav-burger"
                : " flex items-center justify-center w-10 h-10  rounded-[5rem] nav-burger"
            }
          >
            <RxHamburgerMenu className=" text-2xl dark:text-white/70" />
          </button>
          <Link to={"/"}>
            <div className=" ">
              <h1 className="hidden md:block  text-lg sm:text-xl md:text-2xl font-semibold font-body dark:text-white">
                ConnectX
              </h1>
            </div>
          </Link>
        </div>
        <div className="">
          <div className="relative ">
            <form action="" onSubmit={onSubmitHandler}>
              <input
                type="text"
                className=" border dark:border-none  rounded-md dark:text-white dark:bg-gray-700 px-6 py-1 outline-none w-[200px] sm:w-[250px] md:w-[400px] "
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="absolute top-2 left-2  float-left"
                type="submit"
              >
                <BiSearchAlt2 className=" text-lg pr-1 md:pr-0 md:text-base dark:text-white/70" />
              </button>
            </form>
          </div>
        </div>
        <div className=" flex md:gap-3 mr-5">
          <button
            className=" flex items-center justify-center w-10 h-10  rounded-[5rem] nav-toggle"
            onClick={handleThemeSwitch}
          >
            <p className={`${darkMode === "dark" ? "block" : "hidden"} `}>
              <BsFillMoonStarsFill className="text-xl text-white" />
            </p>
            <p className={`${darkMode === "dark" ? " hidden" : "block"} `}>
              <BsFillSunFill className="text-2xl text-yellow-400" />
            </p>
          </button>
          <div className="">
            <div className=" w-10 h-10 rounded-[5rem] bg-[#C4CAD0]  border dark:border-none flex justify-center items-center">
              <div className={` cursor-pointer`}>
                <Menu opened={opened} onChange={setOpened}>
                  <Menu.Target>
                    <h3 className=" uppercase text-2xl font-body font-medium text-gray-900">
                      {name.charAt(0)}
                    </h3>
                  </Menu.Target>
                  <Menu.Dropdown className="dark:bg-gray-800">
                    <Menu.Label>
                      <h3 className="text-gray-900 dark:text-white text-md font-medium font-body capitalize flex items-center gap-1">
                        <BsPerson /> {name}
                      </h3>
                    </Menu.Label>
                    <Menu.Label>
                      <h3 className="text-md text-gray-700 font-body dark:text-white flex items-center gap-1">
                        <AiOutlineMail /> {email}
                      </h3>
                    </Menu.Label>
                    <Menu.Item>
                      <div
                        onClick={logoutHandler}
                        className="text-sm flex text-red-500 font-medium font-serif items-center gap-1"
                      >
                        <IoLogOutOutline className="text-black dark:text-white" />{" "}
                        Logout
                      </div>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
