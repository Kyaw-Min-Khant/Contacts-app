import React, { useEffect } from "react";
import TableHead from "./Table/TableHead";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../DataConfig/firestore";
import TableData from "./Table/TableData";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../app/LightSlice";
import Cookies from "js-cookie";
import { Table } from "@mantine/core";
const ContactList = () => {
  const userInfo = JSON.parse(Cookies.get("Info"));
  const userEmail = userInfo?.email;
  const UserCollectionRef = collection(db, userEmail);
  const dispatch = useDispatch();
  const tbody = (e) => {
    e.stopPropagation();
  };

  const text = useSelector((state) => state.light.users);
  const getUserData = async () => {
    try {
      const unsubscribe = onSnapshot(UserCollectionRef, (snapshot) => {
        const filterData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(getUsers(filterData));
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className=" overflow-y-scroll h-[360px] overflow-x-hidden  overflow-hidden scroll">
      <Table verticalSpacing="xl" className="w-full dark:bg-gray-800">
        <TableHead />
        <tbody className="" onClick={tbody}>
          {text?.map((data) => (
            <TableData key={data.id} {...data} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default ContactList;
