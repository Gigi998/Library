import { useState } from "react";
import axios from "../utils/url";
import { useAuthContext } from "../context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
const LOGIN = "/login";
const LOGOUT = "/logout";

const useLog = () => {
  const { setAuth } = useAuthContext();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Find location
  const from = location?.state?.from?.pathname || "/";

  const handleLogin = async ({
    email,
    pwd,
  }: {
    email: string;
    pwd: string;
  }) => {
    try {
      const json = JSON.stringify({ email, pwd });
      const response = await axios.post(LOGIN, json);
      const accessToken = response?.data?.accessToken;
      setEmail("");
      setPwd("");
      setAuth({ email, accessToken });
      navigate(from, { replace: true });
    } catch (error) {
      setError("Error");
    }
  };

  const handleLogout = async () => {
    setAuth({ email: "", accessToken: "" });
    try {
      const res = await axios.get(LOGOUT);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    email,
    setEmail,
    pwd,
    setPwd,
    handleLogin,
    error,
    setError,
    handleLogout,
  };
};

export default useLog;
