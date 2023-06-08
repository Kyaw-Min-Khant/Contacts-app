import React from "react";
import Siderbar from "../Component/Sidebar/Siderbar";
import Detail from "../Component/Sidebar/Details";
import Navbar from "../Component/Sidebar/Navbar";

const DetailPage = () => {
  return (
    <div className="flex flex-col w-screen">
      <Navbar/>
      <div className="flex w-screen">
        <Siderbar />
        <Detail />
      </div>
    </div>
  );
};

export default DetailPage;
