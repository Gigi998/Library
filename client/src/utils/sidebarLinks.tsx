import { IconType } from "react-icons";
import { GiBookshelf } from "react-icons/gi";
import { MdPeople } from "react-icons/md";
import { ReactNode } from "react";
import { MdPersonAdd } from "react-icons/md";

type LinksType = {
  id: number;
  url: string;
  icon: ReactNode;
  name: string;
};

export const links: LinksType[] = [
  {
    id: 1,
    url: "/",
    icon: <GiBookshelf />,
    name: "books",
  },
  {
    id: 2,
    url: "/students",
    icon: <MdPeople />,
    name: "students",
  },
  {
    id: 3,
    url: "/addStudent",
    icon: <MdPersonAdd />,
    name: "add students",
  },
];
