import React from "react";
import Contacts from "./Component/Sidebar/Contacts";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ContactCreate from "./Component/Sidebar/ContactCreate";
import Detail from "./Component/Sidebar/Details";
import Navbar from "./Component/Sidebar/Navbar";
import Siderbar from "./Component/Sidebar/Siderbar";
const Path = () => {
  return (
    <div className="flex flex-col w-screen">
      <Navbar />
      <div className="flex w-screen">
        <Siderbar />
        <Routes>
          <Route path="/" element={<Contacts />}>
            <Route path="create" element={<ContactCreate />} />
            <Route path="details/:id" element={<Detail />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Path;
