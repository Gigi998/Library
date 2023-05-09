import { Link } from 'react-router-dom';
import { links } from '../utils/sidebarLinks';
import { AiOutlineClose } from 'react-icons/ai';
import useSidebar from '../hooks/useSidebar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect } from 'react';

const Sidebar = () => {
  const { sidebarOpen, closeSidebar, openSidebar, width } = useSidebar();

  useEffect(() => {
    if (width) {
      openSidebar();
    }
  }, [width]);

  return (
    <>
      {sidebarOpen ? (
        <aside className="bg-slate-200 xl:p-10 xl:pt-20 xl:justify-normal gap-3 flex xl:flex-col relative flex-row p-1 justify-center">
          <button
            className="xl:block text-4xl absolute top-3 right-3 hover:scale-150 duration-300 hidden"
            onClick={closeSidebar}
          >
            {<AiOutlineClose />}
          </button>
          {links.map((link) => {
            const { id, name, url, icon } = link;
            return (
              <Link
                to={url}
                className="flex text-4xl hover:bg-cyan-300 ease-in-out duration-1000 active:bg-cyan-700 focus:bg-cyan-500 p-3 rounded-xl"
                key={id}
              >
                <h2 className="flex items-center gap-3  xl:text-4xl text-2xl ">
                  {icon}
                  {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}
                </h2>
              </Link>
            );
          })}
        </aside>
      ) : (
        <button
          className="text-4xl h-10 m-5 hover:scale-125 duration-500 ease-in-out"
          onClick={openSidebar}
        >
          <GiHamburgerMenu />
        </button>
      )}
    </>
  );
};

export default Sidebar;
