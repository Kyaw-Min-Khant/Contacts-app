import React, { useEffect } from "react";
import "../table.css";
import {
  BsPrinter,
  BsSafeFill,
  BsStar,
  BsStarFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import {
  AiOutlineDelete,
  AiOutlineMail,
  AiOutlinePrinter,
  AiOutlineSetting,
} from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { Menu, Tooltip } from "@mantine/core";
import Cookies from "js-cookie";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../DataConfig/firestore";

const TableData = (props) => {
  const {
    id,
    name,
    email,
    phoneNumber,
    job,
    company,
    address,
    note,
    imageUrl,
    fav,
  } = props;

  const place = (e) => {
    e.stopPropagation();
  };
  const storage = JSON?.parse(Cookies?.get("Info"));
  const userDocName = storage?.email;
  const updateDocRef = doc(db, userDocName, id);
  const nav = useNavigate();
  const True = async (e) => {
    e.stopPropagation();
    try {
      await updateDoc(updateDocRef, { fav: true });
    } catch (e) {
      console.log(e);
    }
  };

  const False = async (e) => {
    e.stopPropagation();
    try {
      await updateDoc(updateDocRef, { fav: false });
    } catch (e) {
      console.log(e);
    }
  };
  const del = async (e) => {
    e.stopPropagation();
    try {
      if (confirm("Are you sure you want to delete?")) {
        await deleteDoc(updateDocRef);
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };
  const detailLink = (e) => {
    e.stopPropagation();
    return nav(`/details/${id}`, { state: { data: props } });
  };

  return (
    <tr
      className=" shadow hover:bg-[#e0b5ad31] user cursor-pointer"
      onClick={detailLink}
    >
      <td className="px-3 py-4 font-semibold text-left tracking-wide text-gray-900">
        {imageUrl ? (
          <div className="w-10 h-10 border-2 border-[#D8D8D8] hover:border-blue-500 rounded-full overflow-hidden">
            <img
              src={imageUrl}
              className=" w-10 h-10 object-cover object-center"
              alt=""
            />
          </div>
        ) : (
          <div className="flex items-center justify-center bg-gray-300 rounded-full w-10 h-10 border-2 border-[#acacac] hover:border-blue-500">
            <h2 className=" uppercase text-2xl font-semibold  font-body text-black dark:text-white/90">
              {name?.charAt(0)}
            </h2>
          </div>
        )}
      </td>
      <td className="px-3 py-4 font-semibold flex justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start items-center tracking-wide text-gray-900">
        <div className="">
          <h3 className=" font-body dark:text-white/90">{name}</h3>
          <p className="text-gray-500 font-mono dark:text-white/80 cursor-pointer text-sm">
            {phoneNumber}
          </p>
        </div>
      </td>
      <td className="px-3 py-4 hidden sm:hidden md:hidden lg:table-cell xl:table-cell 2xl:table-cell font-semibold text-left tracking-wide text-gray-900">
        <a
          href=""
          className="hover:border-b-[1px] font-mono dark:text-white/80 border-gray-200"
        >
          {email}
        </a>
      </td>
      <td className="px-3 py-4 hidden sm:hidden md:hidden lg:table-cell xl:table-cell 2xl:table-cell font-semibold text-left tracking-wide text-gray-900 dark:text-white/80 font-mono">
        <a href="https://www.google.com/maps/place/Landon" onClick={place}>
          {address}
        </a>
      </td>
      <td className="px-3 py-4 hidden sm:hidden md:hidden lg:hidden xl:table-cell 2xl:table-cell font-semibold tracking-wide text-gray-900">
        <div className="flex flex-wrap gap-2">
          {job ? (
            <span className="px-3 py-1 text-white rounded bg-blue-500 text-[10px] font-semibold font-mono dark:text-white/80">
              {job}
            </span>
          ) : (
            ""
          )}
        </div>
      </td>
      <td className="px-3 py-4 font-semibold text-left hidden sm:table-cell md:table-cell lg:table-cell xl:table-cell 2xl:table-cell tracking-wide text-gray-900">
        <div className="action">
          <div className="flex items-center gap-5">
            <Tooltip
              label="Favorite"
              className="text-sm"
              color="dark"
              position="bottom"
              withArrow
              arrowSize={6}
              transitionProps={{ transition: "pop", duration: 300 }}
              closeDelay={300}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="">
                {fav ? (
                  <BsStarFill
                    onClick={False}
                    className=" text-lg cursor-pointer dark:text-white/90"
                  />
                ) : (
                  <BsStar
                    onClick={True}
                    className=" text-lg cursor-pointer dark:text-white/70"
                  />
                )}
              </div>
            </Tooltip>
            <Link to={`/details/${id}`} onClick={(e) => e.stopPropagation()}>
              <Tooltip
                label="Detail"
                className="text-sm"
                color="dark"
                position="bottom"
                withArrow
                arrowSize={6}
                transitionProps={{ transition: "pop", duration: 300 }}
                closeDelay={300}
              >
                <div className="">
                  <TbListDetails className="text-lg cursor-pointer dark:text-white/70 " />
                </div>
              </Tooltip>
            </Link>
            <div className="">
              <Menu
                trigger="hover"
                withArrow
                arrowSize={6}
                openDelay={50}
                closeDelay={200}
                position="right"
                offset={-1}
                transitionProps={{ transition: "scale", duration: 500 }}
              >
                <Menu.Target>
                  <div className="" onClick={(e) => e.stopPropagation()}>
                    <BsThreeDotsVertical className=" text-lg cursor-pointer dark:text-white/70" />
                  </div>
                </Menu.Target>
                <Menu.Dropdown size="xs">
                  <Menu.Item
                    onClick={del}
                    size="xs"
                    color="red"
                    icon={<AiOutlineDelete size={14} />}
                  >
                    <p className="text-[0.7rem] p-0">Delete</p>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TableData;
