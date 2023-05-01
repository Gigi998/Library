import { ReactNode, createContext, useContext, useState } from "react";

type AuthType = {
  email: string;
  accessToken: string;
};

type AuthContext = {
  auth: AuthType;
  setAuth: React.Dispatch<
    React.SetStateAction<{ email: string; accessToken: string }>
  >;
};

const AuthContext = createContext({} as AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState({ email: "", accessToken: "" });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
