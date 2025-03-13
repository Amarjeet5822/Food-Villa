import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./AuthContext";
import axios from "axios";
import { api_url } from "../utils/backend_api";
import { useNavigate } from "react-router-dom";

const AuthContextComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // Helper to show toast messages
  const showToast = (type, message) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };
  const SIGNUP = async (email, password, name) => {
    try {
      const res = await axios.post(
        `${api_url}/api/auth/signup`,
        { email, password, name },
        { withCredentials: true }
      );
      showToast(
        "success",
        res.data.message || "Signup successful! Please login."
      );
    } catch (err) {
      showToast("error", err.response?.data?.message || "Signup failed.");
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
      showToast("success", res.data.message || "Login successful!");
      navigate("/");
    } catch (err) {
      setIsAuthenticated(false);
      showToast("error", err.response?.data?.message || "Login failed.");
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
      showToast("success", res.data.message || "Logout successful!");
    } catch (err) {
      showToast("error", err.response?.data?.message || "Logout failed.");
    }
  };
  // CHECK AUTH STATUS
  const checkAuthStatus = async () => {
    try {
      const res = await axios.get(`${api_url}/api/auth/status`, {
        withCredentials: true,
      });
      setIsAuthenticated(res.data.isAuthenticated || false);
    } catch (err) {
      console.error(
        "Error checking auth status:",
        err.response?.data?.message || err.message
      );
    }
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
