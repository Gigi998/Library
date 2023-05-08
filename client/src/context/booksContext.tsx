import { ReactNode, createContext, useContext, useState } from "react";
import axios from "axios";
import useAddAccToken from "../hooks/useAddAccToken";
import { useNavigate } from "react-router-dom";
import { Books } from "../types/booksTypes";
import { axiosBook } from "../utils/url";

export interface CustomAbortController extends AbortController {}

type BookContext = {
  books: Books[];
  setBooks: (value: React.SetStateAction<Books[]>) => void;
  availableBooks: Books[];
  deleteBook: (value: string) => void;
  addNewBook: (value: string) => void;
  fetchAllBooks: (val: boolean, cont: AbortController) => void;
  isAvailable: boolean;
  toggleAvailable: () => void;
  getAvailableBooks: () => void;
};

const BookContext = createContext({} as BookContext);

export const BookContextProvider = ({ children }: { children: ReactNode }) => {
  const axiosToken = useAddAccToken(axiosBook);
  const navigate = useNavigate();
  const [books, setBooks] = useState<Books[]>([]);
  const [availableBooks, setAvailableBooks] = useState<Books[]>([]);
  const [isAvailable, setIsAvailable] = useState(false);

  const fetchAllBooks = async (isMounted: boolean, controller: CustomAbortController) => {
    try {
      const result = await axiosToken.get("", {
        signal: controller.signal,
      });
      isMounted && setBooks(result.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error.name = "CanceledError")) {
          return;
        }
      } else {
        console.log(error);
        navigate("/auth", {
          state: { from: location },
          replace: true,
        });
      }
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axiosToken.delete("", {
        data: {
          id: id,
        },
      });
      setBooks((prev) => prev?.filter((b) => b.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const addNewBook = async (title: string) => {
    try {
      const newBook = await axiosToken.post("", {
        title: title,
      });
      setBooks((prev) => [...prev, newBook.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAvailable = () => {
    setIsAvailable((prev) => !prev);
  };

  const getAvailableBooks = async () => {
    try {
      const result = await axiosToken.get("?freeBooks=true");
      setAvailableBooks(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        deleteBook,
        addNewBook,
        fetchAllBooks,
        isAvailable,
        toggleAvailable,
        availableBooks,
        getAvailableBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  return useContext(BookContext);
};
