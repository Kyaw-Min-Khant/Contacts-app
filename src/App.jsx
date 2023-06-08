import React from "react";

import { Route, Routes } from "react-router-dom";
import Register from "./Component/Sidebar/Register";
import Login from "./Component/Sidebar/Login";
import RouteGuard from "./Component/Sidebar/RouteGuard";
import ContactsPage from "./Path/ContactsPage";
import ContractsCreatePage from "./Path/ContractsCreatePage";
import DetailPage from "./Path/DetailPage";
import SearchPage from "./Path/SearchPage";
import ErrorPage from "./ErrorPage";
import FormRouteGuard from "./FormRouteGuard";

const App = () => {
  return (
    <div className=" dark:bg-gray-900 overflow-x-hidden over-flow-scroll">
      <Routes>
        <Route
          path="/"
          element={
            <RouteGuard>
              <ContactsPage />
            </RouteGuard>
          }
        />
        <Route
          path="/register"
          element={
            <FormRouteGuard>
              <Register />
            </FormRouteGuard>
          }
        />
        <Route
          path="/login"
          element={
            <FormRouteGuard>
              <Login />
            </FormRouteGuard>
          }
        />
        <Route
          path="/create"
          element={
            <RouteGuard>
              <ContractsCreatePage />
            </RouteGuard>
          }
        />
        <Route
          path="/details/:id"
          element={
            <RouteGuard>
              <DetailPage />
            </RouteGuard>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
