import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./AuthContext";
import axios from "axios";
import { api_url } from "../utils/backend_api";
import { useNavigate } from "react-router-dom";

const AuthContextComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Signup logic
  const SIGNUP = async (email, password, name) => {
    try {
      const res = await axios.post(
        `${api_url}/api/auth/signup`,
        { email, password, name },
        { withCredentials: true }
      );
      navigate("/login");
    } catch (err) {
      // console.log(err)
    }
  };
  const LOGIN = async (email, password) => {
    try {
      const res = await axios.post(
        `${api_url}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      setIsAuthenticated(false);
    }
  };
  const LOGOUT = async () => {
    try {
      const res = await axios.post(
        `${api_url}/logout`,
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(false);
    } catch (err) {
      // console.log(err.message)
    }
  };
  // CHECK AUTH STATUS
  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${api_url}/api/auth/status`, {
        withCredentials: true,
      });
      setIsAuthenticated(res.data.isAuthenticated || false);
    } catch (err) {}
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        checkAuthStatus,
        LOGIN,
        SIGNUP,
        LOGOUT,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;
