import { useState } from 'react';
import axiosInstance from '../utils/url';
import axios from 'axios';

const REGISTER = '/register';

const useRegister = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const [error, setError] = useState('');

  const handleRegister = async ({
    email,
    pwd,
  }: {
    email: string;
    pwd: string;
  }) => {
    try {
      const json = JSON.stringify({ email, pwd });
      const response = await axiosInstance.post(REGISTER, json);
      const accessToken = response?.data?.accessToken;
      setEmail('');
      setPwd('');
      console.log(accessToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 409) {
          setError('Email already in use');
        }
      } else {
        setError('Server error');
      }
    }
  };

  return { email, setEmail, pwd, setPwd, handleRegister, error, setError };
};

export default useRegister;
