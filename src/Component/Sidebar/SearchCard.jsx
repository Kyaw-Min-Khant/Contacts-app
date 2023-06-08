import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SearchCard = (props) => {
  const { name, email, phoneNumber, id, imageUrl,address } = props;
  const navigate = useNavigate();
  const detailLink = (e) => {
    navigate(`/details/${id}`);
  };
  return (
    <div onClick={detailLink} className=" p-5 mx-auto  mt-5">
      <>
        <div
          key={id}
          className="flex min-w-[200px] sm:min-w-[200px] md:min-w-[230px] lg:min-w-[250px] xl:min-w-[300px] flex-col items-center p-5 rounded-lg shadow-lg shadow-blue-100 dark:shadow-none dark:bg-gray-700 gap-3 justify-center user-card"
        >
          <div className="flex justify-between items-center pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16   overflow-hidden">
                {imageUrl ? (
                  <div className="w-16 h-16 border-2 border-[#D8D8D8] hover:border-blue-500 rounded-[5rem] overflow-hidden">
                    <img
                      src={imageUrl}
                      className=" w-16 h-16 object-cover object-center"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-gray-300 rounded-[50%] w-10 h-10 border-2 border-[#acacac] hover:border-blue-500">
                    <h2 className=" uppercase text-2xl font-semibold  text-black">
                      {name?.charAt(0)}
                    </h2>
                  </div>
                )}
              </div>
              <div className=" flex flex-col gap-1">
                <h3 className="font-semibold dark:text-white font-body">
                  {name}
                </h3>
                <a
                  href="#"
                  className="text-gray-500 dark:text-white/80 cursor-pointer font-mono text-sm"
                >
                  {phoneNumber}
                </a>
                <h4 className="  text-gray-700 dark:text-white font-mono">
                  {email}
                </h4>
                <p className=" text-gray-700 dark:text-white/80 font-serif">{address}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SearchCard;
