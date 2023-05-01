import { useAuthContext } from "../context/authContext";
import axios from "../utils/url";

const REFRESH = "/refresh";

const useRefresh = () => {
  const { setAuth } = useAuthContext();

  const handleRefresh = async () => {
    try {
      const result = await axios.get(REFRESH, {
        withCredentials: true,
      });
      var newAccToken = result.data.accessToken;
      const email = result.data.email;
      setAuth((prev) => {
        return { ...prev, accessToken: newAccToken, email: email };
      });
    } catch (error) {
      console.log(error);
    }
    return newAccToken;
  };
  return handleRefresh;
};

export default useRefresh;
