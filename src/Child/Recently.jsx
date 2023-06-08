import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import Form from "../DetailComponent/EmailForm";
import { useSelector } from "react-redux";
const Recently = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [favoriteItem, setFavoriteItem] = useState([]);
  const [filterFavorite, setFilterFavorite] = useState([]);
  const favorite = useSelector((state) => state.light.users);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  useEffect(() => {
    setFavoriteItem(favorite);
  }, [favorite]);

  useEffect(() => {
    const filter = favoriteItem.filter((item) => item.fav === true);
    setFilterFavorite(filter);
  }, [favoriteItem, favorite]);

  const place = (e) => {
    e.stopPropagation();
  };
  const call = (e) => {
    e.stopPropagation();
  };
  const userEmailAndCall = (e) => {
    e.stopPropagation();
  };
  const firstComponent = (e) => {
    e.stopPropagation();
    navigate(`/details/${item?.id}`);
  };
  return (
    <div className="flex items-center relative px-3">
      <div className=" min-w-full w-[90vw] justify-start sm:w-[90vw] md:w-[90vw] lg:w-[70vw] xl:w-[85vw] overflow-x-scroll scroll-custom flex items-center gap-5 scroll-smooth py-4">
        {filterFavorite?.map((item) => {
          return (
            <div
              key={item?.id}
              className="flex min-w-[350px] sm:min-w-[360px] md:min-w-[370px] lg:min-w-[380px] xl:min-w-[380px] flex-col p-5 rounded-lg shadow-lg shadow-blue-100 dark:shadow-none dark:bg-gray-700 gap-3 justify-center user-card"
              onClick={userEmailAndCall}
            >
              <div onClick={firstComponent}>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      {item?.imageUrl ? (
                        <img
                          src={item?.imageUrl}
                          className=" w-10 h-10 object-cover object-center"
                          alt=""
                        />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          className=" w-10 h-10 object-cover object-center"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="">
                      <h3 className="font-semibold dark:text-white font-body">
                        {item?.name}
                      </h3>
                      <a
                        href={`tel:${item?.phoneNumber}`}
                        onClick={call}
                        className="text-gray-500 dark:text-white/80 cursor-pointer font-mono text-sm"
                      >
                        {item?.phoneNumber}
                      </a>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">
                    <BsStarFill className="text-gray-400 text-sm" />
                  </div>
                </div>
              </div>
              <div className="p-2">
                <a
                  href={`https://www.google.com/maps/place/${item?.address}`}
                  onClick={place}
                  className="text-gray-600 dark:text-white/80 font-[500] font-mono mb-1"
                >
                  {item?.address}
                </a>
                <p className=" text-gray-600 dark:text-white/80 font-[500] font-mono text-sm">
                  {item?.email}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <button
                  onClick={(e) => {
                    open();
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-2 px-4 py-1 text-gray-400 dark:text-white/70 text-email font-serif text-sm"
                >
                  <AiOutlineMail /> Send Email
                </button>
                <Modal
                  title="Send Email"
                  size="auto"
                  onClose={close}
                  opened={opened}
                  transitionProps={{
                    transition: "pop",
                    duration: 300,
                    timingFunction: "linear",
                  }}
                  overlayProps={{
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[7],
                    opacity: 0.55,
                    blur: 3,
                  }}
                  centered
                >
                  <Form close={close} data={item} />
                </Modal>
                <a
                  onClick={call}
                  href={`tel:${item?.phoneNumber}`}
                  className="flex items-center gap-2 px-4 py-1 text-gray-400 dark:text-white/70 font-serif text-call text-sm"
                >
                  <BiPhoneCall /> Call
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Recently;
