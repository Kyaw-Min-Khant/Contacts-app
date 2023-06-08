import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = Cookies?.get("Info");
  useEffect(() => {
    if (userInfo == undefined) {
      return navigate("/login");
    }
  }, []);
  if (userInfo != undefined) {
    return children;
  }
};

export default RouteGuard;
