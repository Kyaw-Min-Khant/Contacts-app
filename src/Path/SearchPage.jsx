import React from "react";
import Navbar from "../Component/Sidebar/Navbar";
import Siderbar from "../Component/Sidebar/Siderbar";
import Search from "../Component/Sidebar/Search";
const SearchPage = () => {
  return (
    <div className=" flex flex-col w-screen">
      <Navbar />
      <div className=" flex w-screen">
        <Siderbar />
        <Search />
      </div>
    </div>
  );
};

export default SearchPage;
