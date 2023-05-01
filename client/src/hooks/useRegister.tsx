import { useState } from "react";
import axios from "../utils/url";

const REGISTER = "/register";

const useRegister = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  const handleRegister = async ({
    email,
    pwd,
  }: {
    email: string;
    pwd: string;
  }) => {
    try {
      const json = JSON.stringify({ email, pwd });
      const response = await axios.post(REGISTER, json);
      const accessToken = response?.data?.accessToken;
      setEmail("");
      setPwd("");
      console.log(accessToken);
    } catch (error) {
      setError("Error");
    }
  };

  return { email, setEmail, pwd, setPwd, handleRegister, error, setError };
};

export default useRegister;
