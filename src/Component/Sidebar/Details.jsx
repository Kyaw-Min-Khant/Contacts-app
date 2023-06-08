import { Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DetailCard from "../../DetailComponent/DetailCard";
import Edit from "../../DetailComponent/DetailEdit";
import LineThrough from "../../DetailComponent/LineThrough";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../DataConfig/firestore";
import Cookies from "js-cookie";
import DetailEdit from "../../DetailComponent/DetailControl";
const Detail = () => {
  const [user, setUser] = useState([]);
  // const [newImage, setNewImage] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [edit, setEdit] = useState(false);
  const dateTime = new Date().toLocaleString("en-GB", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
  const UserId = useParams();
  const storage = JSON.parse(Cookies?.get("Info"));
  const userDocName = storage.email;
  const UserRef = doc(db, userDocName, UserId.id);

  const UserData = async () => {
    try {
      const unsubscribe = onSnapshot(UserRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setUser(data);
        } else {
          setUser(null);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    UserData();
  }, [edit, user]);
  const submit = () => {
    confirmAlert({
      title: "You have unsaved changes",
      message: "Are you sure you want to discard your unsaved changes?",
      buttons: [
        {
          label: "Discard",
          onClick: () => setEdit(!edit),
        },
        {
          label: "Cancel",
          onClick: () => setEdit(edit),
        },
      ],
    });
  };
  return (
    <div className=" w-[100vw] sm:w-[90vw] md:w-[80vw] mx-auto lg:w-[80%] xl:w-[80%] min-h-full px-0 sm:px-3 lg:px-8 md:px-4 ">
      <div className="m-5">
        {!edit ? (
          <Link to={"/"} className=" cursor-pointer">
            <h3>
              <BsArrowLeft className="text-xl font-semibold dark:text-white/70" />
            </h3>
          </Link>
        ) : (
          <>
            <Link
              onClick={(e) => {
                e.stopPropagation();
                if (edit) {
                  submit();
                }
              }}
              className=" cursor-pointer"
            >
              <h3>
                <RxCross2 className="text-xl font-semibold dark:text-white/70" />
              </h3>
            </Link>
          </>
        )}
      </div>

      <div className="flex justify-center items-center sm:justify-center sm:items-center md:justify-center md:items-center xl:justify-start lg:items-center xl:items-center lg:justify-start xl:ml-40 lg:ml-28 flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-5 ">
        <div className="p-5 sm:p-5 md:p-5 lg:p-0 xl:p-0">
          {user?.imageUrl ? (
            <div
              className=" w-[150px] sm:w-[160px] md:w-[150px] lg:w-[200px] h-[150px] sm:h-[160px] md:h-[150px] lg:h-[200px]  overflow-hidden rounded-full cursor-pointer"
              onClick={open}
            >
              <img
                src={user?.imageUrl}
                alt=""
                className=" w-[150px] sm:w-[160px] md:w-[150px] lg:w-[200px] h-[150px] sm:h-[160px] md:h-[150px] lg:h-[200px] object-cover"
              />
            </div>
          ) : (
            <div
              className=" w-[150px] sm:w-[160px] md:w-[150px] lg:w-[200px] bg-gray-200 border-4 border-gray-400 hover:border-blue-500 overflow-hidden rounded-full cursor-pointer"
              onClick={open}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
                className=" w-[150px] sm:w-[160px] md:w-[150px] lg:w-[200px] object-cover"
              />
            </div>
          )}
        </div>
        <Modal
          onClose={close}
          opened={opened}
          centered
          title={<h3 className="text-lg font-semibold font-body">Photo</h3>}
          transitionProps={{
            transition: "fade",
            duration: 400,
            timingFunction: "linear",
          }}
          radius={"0.7rem"}
        >
          <div className="p-5">
            <div className="flex flex-col justify-center items-center mx-auto rounded-full h-[200px] w-[200px] overflow-hidden">
              <img
                src={user?.imageUrl}
                alt=""
                className="h-[200px] w-[200px] object-cover"
              />
            </div>
            <div className="text-center mt-5">
              <h3 className="text-lg font-semibold font-body">{user?.name}</h3>
              <p className=" font-mono">{user?.email}</p>
              {/* <div className="flex justify-center mt-5">
                <TextInput
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Upload New Image"
                />
              </div> */}
            </div>
          </div>
        </Modal>
        <div className="flex flex-col">
          <h3 className=" text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold font-body dark:text-white/90 ">
            {user?.name}
          </h3>
          <p className="text-gray-700 dark:text-white/80 font-mono font-medium text-sm sm:text-sm md:text-base lg:text-base mt-1">
            {user?.job}
          </p>
        </div>
      </div>

      <DetailEdit edit={edit} setEdit={setEdit} user={user} />

      {!edit ? (
        <div className="m-3">
          <LineThrough user={user} />
          <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-between gap-10 w-[80%] mt-16">
            <DetailCard user={user} />
            <div className="">
              <h3 className="text-lg text-gray-800 dark:text-white/90  font-body flex items-center gap-1">
                History{" "}
                <AiOutlineQuestionCircle className="text-gray-500 dark:text-white/70" />
              </h3>
              <p className=" dark:text-white/80 font-serif">
                Last edited :{" "}
                <span className="text-gray-700 dark:text-white/80">{`Today,${dateTime}`}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <Edit user={user} edit={edit} setEdit={setEdit} />
        </div>
      )}
    </div>
  );
};
export default Detail;
