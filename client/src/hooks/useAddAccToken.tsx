import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import useRefresh from "../hooks/useRefresh";
import { AxiosInstance } from "axios";

const useAddAccToken = (axiosPrivate: AxiosInstance) => {
  const { auth } = useAuthContext();
  const handleRefresh = useRefresh();

  useEffect(() => {
    // Do add accesstoken to headers
    const requestInt = axiosPrivate.interceptors.request.use(
      (config) => {
        // First request
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    // Response interceptors
    const responseInt = axiosPrivate.interceptors.response.use(
      (response) => response,
      // Interceptor error
      async (error) => {
        const prevRequest = error?.config;
        if (error.response.status === 403 && !prevRequest._retry) {
          prevRequest._retry = true;
          const newAccToken = await handleRefresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    //  Remove previous intercepotrs
    return () => {
      axiosPrivate.interceptors.request.eject(requestInt);
      axiosPrivate.interceptors.response.eject(responseInt);
    };
  }, [auth, handleRefresh]);
  return axiosPrivate;
};

export default useAddAccToken;
