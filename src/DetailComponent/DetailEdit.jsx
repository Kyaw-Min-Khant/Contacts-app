import { TextInput, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import "./DetailEdit.css";
import {
  BsCalendar,
  BsFlag,
  BsPerson,
  BsTelephone,
  BsPersonWorkspace,
} from "react-icons/bs";
import { db } from "../DataConfig/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import moment from "moment";
const Edit = ({ edit, setEdit, user }) => {
  const storage = JSON?.parse(Cookies?.get("Info"));
  const userDocName = storage?.email;
  const UserId = useParams();
  const updateDocRef = doc(db, userDocName, UserId.id);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [telephone, setTelephone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [job, setJob] = useState("");
  const [note, setNote] = useState("");
  const handleDateChange = (date) => {
    setBirthday(date);
  };
  useEffect(() => {
    setFirstName(user?.name);
    setEmail(user?.email);
    setJob(user?.job);
    setTelephone(user?.phoneNumber);
    setNote(user?.note);
    setCountry(user?.address);
  }, []);
  const formSubmit = async (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to Change?")) {
      try {
        await updateDoc(updateDocRef, {
          name: firstName,
          email,
          address: country,
          phoneNumber: telephone,
          job,
          note,
          date: moment(birthday).format("LL"),
        });
        setEdit(!edit);
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <div className="">
      <form className="flex flex-col gap-4 lg:w-[70%] lg:ml-0 ml-3  w-[90%] border dark:border-gray-500 rounded-md p-3">
        <div className="flex justify-between gap-5">
          <TextInput
            placeholder={"Name"}
            icon={<BsPerson />}
            label="Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full"
          />
          <TextInput
            placeholder="your@gmail.com"
            icon={<AiOutlineMail />}
            label="Gmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            className="w-full"
          />
        </div>
        <TextInput
          type="number"
          placeholder="Phone"
          label="Phone"
          icon={<BsTelephone />}
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <TextInput
          label="Country"
          placeholder="Country"
          icon={<BsFlag />}
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <DateInput
          label="Birthday"
          icon={<BsCalendar />}
          placeholder="YYYY-MM-DD"
          value={birthday}
          onChange={handleDateChange}
        />
        <TextInput
          label="Job"
          placeholder="Job"
          icon={<BsPersonWorkspace />}
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <Textarea
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          type="submit"
          onClick={formSubmit}
          className="px-3 py-1 text-sm bg-blue-600 rounded w-20 text-white font-semibold font-serif"
        >
          Change
        </button>
      </form>
    </div>
  );
};
export default Edit;
