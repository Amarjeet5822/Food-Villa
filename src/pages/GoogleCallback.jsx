import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


function GoogleCallback() {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    setIsAuthenticated(true)
    navigate("/");
  }, []);
  return <div></div>;
}

export default GoogleCallback;
