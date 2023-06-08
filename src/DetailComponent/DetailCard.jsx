import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiCake, BiNote } from "react-icons/bi";
import { BsFlag, BsTelephone, BsPersonWorkspace } from "react-icons/bs";
import { Link } from "react-router-dom";
const DetailCard = ({ user }) => {
  const userPhoneNumber = user?.phoneNumber;
  return (
    <div className="flex flex-col gap-5 min-w-[380px] sm:min-w-[400px] md:min-w-[430px] lg:min-w-[450px] xl:min-w-[450px] p-3 border rounded-md shadow-md shadow-gray-100 dark:shadow-none dark:border-gray-500">
      <h3 className="text-gray-800 font-semibold font-body dark:text-white/90">Contact details</h3>
      <div className="flex flex-col gap-3">
        <p className="flex items-center">
          <AiOutlineMail className="text-gray-600 dark:text-white/70 mr-5 mb-0" />{" "}
          <Link
          target="_se"
            to={`https://mail.google.com/mail/u/?authuser=${user?.email}`}
            className="text-blue-400 dark:text-blue-500 font-mono"
          >
            {user?.email}
          </Link>
        </p>
        <p className="flex items-center">
          <BsTelephone className="text-gray-600 dark:text-white/70 mr-5 mb-0" />
          <a href={"tel:" + userPhoneNumber} className="text-blue-400 dark:text-blue-500 font-mono">
            {user?.phoneNumber}
          </a>
        </p>
        <p className="flex items-center">
          <BsFlag className="text-gray-600 dark:text-white/70 mr-5 mb-0" />
          <a
            target="_self"
            href={`https://www.google.com/maps/place/${user?.address}`}
            onClick={(e) => e.stopPropagation()}
            className="text-gray-700  dark:text-white/80 font-serif"
          >
            {user?.address}
          </a>
        </p>
        <span className="flex items-center">
          <BsPersonWorkspace className="text-gray-600 dark:text-white/70 mr-5 mb-0" />
          <p className="text-gray-700  dark:text-white/80 font-serif">{user?.job}</p>
        </span>
        <span className="flex items-center">
          <BiCake className="text-gray-600 dark:text-white/70 mr-5 mb-0" />
          <p className="text-gray-700  dark:text-white/80 font-serif">{user?.date}</p>
        </span>
        <span className="flex items-center">
          <BiNote className="text-gray-600 dark:text-white/70 mr-5 mb-0" />
          <p className="text-gray-700 dark:text-white/80 font-serif">{user?.note}</p>
        </span>
      </div>
    </div>
  );
};
export default DetailCard;
