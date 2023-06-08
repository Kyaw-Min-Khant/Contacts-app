import { Loader, Menu, Tooltip } from "@mantine/core";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePrinter } from "react-icons/ai";
import { BsStar, BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { db } from "../DataConfig/firestore";
import { useNavigate, useParams } from "react-router-dom";
const DetailEdit = ({ edit, setEdit, user }) => {
  const UserId = useParams();
  const storage = JSON?.parse(Cookies?.get("Info"));
  const userDocName = storage?.email;
  const updateDocRef = doc(db, userDocName, UserId.id);
  const navigate = useNavigate();
  const True = async (e) => {
    try {
      await updateDoc(updateDocRef, { fav: true });
    } catch (e) {
      console.log(e);
    }
  };
  const False = async (e) => {
    try {
      await updateDoc(updateDocRef, { fav: false });
    } catch (e) {
      console.log(e);
    }
  };
  const del = async (e) => {
    e.stopPropagation();
    try {
      await deleteDoc(updateDocRef);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex mt-[15px] justify-end gap-5 items-center mr-5 sm:mr-5 md:mr-0 lg:mr-0">
        <Tooltip
          label="Favorite"
          className={`text-sm`}
          color="dark"
          position="bottom"
          withArrow
          arrowSize={6}
          transitionProps={{ transition: "pop", duration: 300 }}
          closeDelay={100}
        >
          <div className="">
            {user?.fav ? (
              <BsStarFill onClick={False} className="dark:text-white text-lg cursor-pointer" />
            ) : (
              <BsStar onClick={True} className="dark:text-white text-lg cursor-pointer" />
            )}
          </div>
        </Tooltip>
        <div className={!edit ? "block" : "hidden"}>
          <Menu
            trigger="hover"
            openDelay={50}
            closeDelay={300}
            transitionProps={{ transition: "scale", duration: 500 }}
          >
            <Menu.Target>
              <div className="">
                <BsThreeDotsVertical className=" dark:text-white text-lg cursor-pointer" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={del}
                color="red"
                icon={<AiOutlineDelete size={14} />}
              >
                <p className=" font-serif">Delete</p>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
        {/* id lo tl */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setEdit(!edit);
          }}
        >
          {!edit ? (
            <button className="px-5 py-1 bg-blue-600 text-white text-sm font-semibold font-serif rounded">
              Edit
            </button>
          ) : (
            <button
              className="px-5 py-1 bg-blue-600 text-white text-sm font-semibold font-serif rounded"
              onClick={(e) => {
                e.stopPropagation();
                if (
                  confirm(
                    "Are you sure you want to discard your unsaved changes?"
                  )
                ) {
                  setEdit(!edit);
                } else {
                  setEdit(edit);
                }
              }}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default DetailEdit;
