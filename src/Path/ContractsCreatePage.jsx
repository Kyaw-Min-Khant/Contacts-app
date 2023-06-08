import React from "react";
import Navbar from "../Component/Sidebar/Navbar";
import Siderbar from "../Component/Sidebar/Siderbar";
import ContactCreate from "../Component/Sidebar/ContactCreate";

const ContractsCreatePage = () => {
  return (
    <div className=" flex flex-col w-screen">
      <Navbar />
      <div className="flex w-screen">
        <Siderbar />
        <ContactCreate />
      </div>
    </div>
  );
};

export default ContractsCreatePage;
