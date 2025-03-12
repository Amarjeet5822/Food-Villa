import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GoogleCallback() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("isLogged", true);
    navigate("/");
  }, []);
  return <div></div>;
}

export default GoogleCallback;
