import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

const AuthCheck = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return (
    <>
      {/* If there is no acc token, navigate to login page */}
      {auth.accessToken ? (
        <Outlet />
      ) : (
        // Add from so we can determine from which page user came
        <Navigate to="/auth" state={{ from: location }} replace />
      )}
    </>
  );
};

export default AuthCheck;
