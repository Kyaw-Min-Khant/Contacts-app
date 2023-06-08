import React from "react";
import Navbar from "../Component/Sidebar/Navbar";
import Siderbar from "../Component/Sidebar/Siderbar";
import Contracts from "../Component/Sidebar/Contacts";
const ContactsPage = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex h-screen justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start 2xl:justify-start">
        <Siderbar />
        <Contracts />
      </div>
    </div>
  );
};

export default ContactsPage;
