import React, { useEffect, useState } from "react";
import ContactList from "../../Child/ContactList";
import Recently from "../../Child/Recently";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import Cookies from "js-cookie";
import { db } from "../../DataConfig/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getUsers } from "../../app/LightSlice";
const Contacts = () => {
  const [user, setUser] = useState([]);
  const [fav, setFav] = useState([]);
  const userToken = Cookies?.get("User");
  const userInfo = JSON.parse(Cookies.get("Info"));
  const userEmail = userInfo?.email;
  const UserCollectionRef = collection(db, userEmail);
  const dispatch = useDispatch();

  const text = useSelector((state) => state.light.users);
  const getUserData = async () => {
    try {
      const data = await getDocs(UserCollectionRef);
      const filterData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(getUsers(filterData));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setFav(text);
  }, [text]);

  useEffect(() => {
    const filter = fav.filter((item) => item.fav === true);
    setUser(filter);
  }, [fav]);

  const data = useSelector((state) => state.light.users);

  const filterFav = data?.filter((item) => item.fav === true);
  useEffect(() => {
    setUser(filterFav);
  }, [data]);

  if (data?.length === 0) {
    return (
      <div className="flex justify-center w-screen h-[700px]">
        <div className="flex flex-col w-80 sm:w-80 md:w-96 justify-center items-center border shadow bg-[#daf3ff] h-[550px] gap-7 p-5 mt-20">
          <div className="">
            <img
              src="https://laddr.co.in/wp-content/uploads/2022/10/Contact-us-rafiki.png"
              className=" object-cover"
              alt=""
            />
          </div>
          <div className="">
            <h3 className="text-gray-800 dark:text-white/80 font-semibold font-body text-xl text-center mb-3">
              No Contact
            </h3>
            <p className="text-gray-600 dark:text-white/70 text-center font-mono">
              There are no contacts at the moment to add some friend
            </p>
          </div>
          <div className="">
            <NavLink to={"/create"}>
              <button className="p-4 font-semibold text-lg rounded-full bg-blue-500 text-white">
                <BsPersonPlus className="text-xl text-white font-semibold" />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {text.length === 0 ? (
        <div className="flex justify-center w-screen relative ">
          <Loader />
        </div>
      ) : (
        <div className=" flex w-screen sm:w-[80vw] md:w-[90vw] lg:w-screen xl:w-screen flex-col gap-5">
          {user.length === 0 ? (
            <div className=""></div>
          ) : (
            <div className=" mt-5">
              <h3 className="text-2xl text-blue-800 dark:text-blue-700 font-semibold font-body mb-5 ml-5">
                Favorite
              </h3>
              <Recently />
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-2xl text-blue-800 dark:text-blue-700 font-semibold font-body mb-5 ml-5">
              Contact Lists
            </h3>
            <ContactList />
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
