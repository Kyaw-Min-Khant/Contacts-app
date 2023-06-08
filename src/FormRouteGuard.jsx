import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const FormRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const userInfo = Cookies?.get("Info");
  useEffect(() => {
    if (userInfo) {
      return navigate("/");
    }
  }, []);
  if (userInfo == undefined) {
    return children;
  }
};

export default FormRouteGuard;
