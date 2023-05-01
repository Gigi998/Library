import { Link } from "react-router-dom";
import { links } from "../utils/sidebarLinks";
import { AiOutlineClose } from "react-icons/ai";
import useSidebar from "../hooks/useSidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const Sidebar = () => {
  const { sidebarOpen, closeSidebar, openSidebar } = useSidebar();
  return (
    <>
      {sidebarOpen ? (
        <aside className="bg-slate-200 w-1/5 p-10 pt-20 gap-3 flex flex-col relative">
          <button
            className="text-4xl absolute top-3 right-3"
            onClick={closeSidebar}
          >
            {<AiOutlineClose />}
          </button>
          {links.map((link) => {
            const { id, name, url, icon } = link;
            return (
              <Link
                to={url}
                className="flex text-4xl hover:bg-slate-300"
                key={id}
              >
                <h2 className="flex items-center gap-3">
                  {icon}
                  {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
                </h2>
              </Link>
            );
          })}
        </aside>
      ) : (
        <button className="text-4xl h-10 m-5" onClick={openSidebar}>
          <GiHamburgerMenu />
        </button>
      )}
    </>
  );
};

export default Sidebar;
