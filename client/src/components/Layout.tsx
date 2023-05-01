import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuthContext } from "../context/authContext";
import useLog from "../hooks/useLog";

const Layout = () => {
  const { auth } = useAuthContext();
  const { handleLogout } = useLog();

  return (
    <main className=" bg-cyan-500 h-full min-h-screen w-screen flex">
      <Sidebar />
      <section className="flex-1 p-10">
        {auth.email && (
          <button
            className="bg-slate-300 h-10 p-3 flex items-center justify-center mt-3 hover:bg-slate-200 w-24 ml-auto"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
