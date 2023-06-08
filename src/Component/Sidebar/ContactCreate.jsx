import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../DataConfig/firestore";
import Cookies from "js-cookie";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { GrMail } from "react-icons/gr";
import { BiImageAdd, BiMap } from "react-icons/bi";
import {
  BsTrash,
  BsFillPersonFill,
  BsFillTelephoneFill,
  BsPersonWorkspace,
  BsFillBuildingsFill,
} from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { CgNotes } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { RxCross2 } from "react-icons/rx";
import "./ContactCreate.css";

import moment from "moment";
const ContactCreate = () => {
  const [load, setLoad] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [job, setJob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const userToken = Cookies?.get("User");
  const [openedImageModal, { open: openImageModal, close: closeImageModal }] =
    useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const userData = JSON.parse(Cookies.get("Info"));
  const userEmail = userData.email;
  const navigate = useNavigate();

  const handleEdit = () => {
    closeEditModal();
    openImageModal();
    setImage("");
  };

  const handleDelete = () => {
    setImage(null);
    closeEditModal();
  };
  const contactData = collection(db, userEmail);
  const addContact = async (e) => {
    setLoad(false);
    e.preventDefault();
    try {
      await addDoc(contactData, {
        name,
        email,
        company,
        date: moment(date).format("LL"),
        job,
        phoneNumber,
        address,
        note,
        imageUrl,
        fav: false,
      });

      navigate("/");
    } catch (e) {
      console.error(e);
      setLoad(true);
    }
  };
  return (
    <div className="relative w-screen flex  flex-col p-5 md:items-center ">
      <div className="  flex justify-between items-end  md:self-start p-3">
        <div className=" md:hidden">
          <Link to={"/"}>
            <button className="text-xl  close-btn">
              <RxCross2 className=" dark:text-white/70" />
            </button>
          </Link>
        </div>
        <div className=" md:hidden">
          <Link>
            <button
              onClick={addContact}
              className={` text-white bg-blue-500 font-serif rounded-md px-5 py-1`}
            >
              Create
            </button>
          </Link>
        </div>
      </div>
      <hr className=" text-gray-900 md:hidden" />
      <div className=" flex flex-col items-center md:items-baseline gap-5 mt-3">
        <div className="mb-3 hidden md:block">
          <Link to={"/"}>
            <button className="text-xl  close-btn">
              <RxCross2 className=" dark:text-white/70" />
            </button>
          </Link>
        </div>
        <div>
          <form
            action=""
            className=" flex flex-col items-center md:block"
            onSubmit={addContact}
          >
            <div
              className={`${
                imageUrl ? "bg-none" : "bg-gray-300"
              } w-32 h-32 border md:w-40 md:h-40 rounded-[5rem] relative  flex items-center justify-center`}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Contact"
                  className="w-full h-full object-cover rounded-[5rem]"
                />
              ) : (
                <div onClick={openImageModal}>
                  <BiImageAdd className=" text-4xl" />
                </div>
              )}
              <div className={`${imageUrl ? { close } : ""}`}>
                <Modal
                  opened={openedImageModal}
                  onClose={closeImageModal}
                  title="Upload Image"
                  centered
                  size={250}
                >
                  <div className=" bg-white rounded-md  ">
                    <div className=" flex flex-col gap-3 ">
                      <TextInput
                        type="text"
                        className=""
                        value={imageUrl}
                        placeholder="Enter image url"
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                      <button
                        className=" px-4 py-1 text-white rounded-md bg-blue-600"
                        onClick={closeImageModal}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
              <div>
                <div
                  className={`${
                    imageUrl ? "block" : "hidden"
                  } absolute float-right bottom-2 right-2 `}
                ></div>
                <div className={`${imageUrl ? { close } : ""}`}>
                  <Modal
                    opened={openedEditModal}
                    onClose={closeEditModal}
                    title="Edit"
                    centered
                    size={250}
                  >
                    <div className=" bg-white rounded-md  ">
                      <div className=" flex flex-col gap-3 ">
                        <div
                          className=" flex gap-3 items-center hover:bg-gray-200 p-3"
                          onClick={handleEdit}
                        >
                          <BiImageAdd className=" text-gray-500 text-lg" />
                          <h4>Change picture</h4>
                        </div>
                        <div
                          className=" flex gap-3 items-center hover:bg-gray-200 p-3"
                          onClick={handleDelete}
                        >
                          <BsTrash className="text-gray-500 text-lg" />
                          <h4>Delete picture</h4>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
            <div>
              <TextInput
                type="text"
                label="Name"
                icon={<BsFillPersonFill />}
                className=" w-[300px] md:w-[500px] lg:w-[550px] "
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="mt-3">
              <TextInput
                type="tel"
                label="Phone number"
                icon={<BsFillTelephoneFill />}
                className=" w-[300px] md:w-[500px] lg:w-[550px]"
                placeholder="Phone number"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <TextInput
                type="text"
                required
                label="Email"
                icon={<GrMail />}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="   w-[300px] md:w-[500px] lg:w-[550px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="mt-3">
              <TextInput
                type="text"
                label="Address"
                icon={<BiMap />}
                required
                className="   w-[300px] md:w-[500px] lg:w-[550px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>
            <div className="mt-3">
              <DateInput
                type="text"
                label="Birthday"
                icon={<SlCalender />}
                valueFormat="DD/MM/YYYY "
                className="w-[300px] md:w-[500px] lg:w-[550px]"
                value={date}
                onChange={setDate}
                placeholder="Birthday"
              />
              <p className="text-gray-500 mt-1">DD/MM/YY</p>
            </div>
            <div className="mt-3 ">
              <TextInput
                type="text"
                label="Job"
                icon={<BsPersonWorkspace />}
                className=" w-[300px] md:w-[500px] lg:w-[550px]"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="Job"
              />
            </div>
            <div className="mt-3 ">
              <TextInput
                type="text"
                label="Company"
                icon={<BsFillBuildingsFill />}
                className=" w-[300px] md:w-[500px] lg:w-[550px]"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
              />
            </div>
            <div className=" mt-3">
              <TextInput
                type="text"
                label="Note"
                icon={<CgNotes />}
                className=" w-[300px] md:w-[500px] lg:w-[550px]"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add note"
              />
            </div>
            <button
              type="submit"
              className=" px-6 py-2 text-white rounded-md  bg-blue-500 hover:bg-blue-600 font-serif mt-5 hidden md:block "
            >
              Create Contact
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactCreate;
