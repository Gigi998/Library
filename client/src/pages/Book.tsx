import { useEffect } from "react";
import { useBookContext } from "../context/booksContext";
import BookItem from "../components/BookItem";
import AddNewBook from "../components/AddNewBook";

const Book = () => {
  const {
    books,
    setBooks,
    fetchAllBooks,
    isAvailable,
    toggleAvailable,
    availableBooks,
    getAvailableBooks,
  } = useBookContext();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    fetchAllBooks(isMounted, controller);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [setBooks]);

  useEffect(() => {
    getAvailableBooks();
  }, [books]);

  return (
    <section className="main-page">
      <div className="flex items-center justify-between">
        <h2 className="text-4xl mr-5">
          {!isAvailable
            ? "These are the all books we have!"
            : "Available books"}
        </h2>
        <button
          className="bg-slate-200 h-10 p-3 flex items-center mt-3"
          onClick={toggleAvailable}
        >
          {isAvailable ? "Show all books" : "Show available books"}
        </button>
      </div>
      <div className="flex items-center flex-col w-full">
        {!isAvailable && <AddNewBook />}
        <div className="w-full">
          {!isAvailable
            ? books?.map((b) => {
                return <BookItem key={b.id} {...b} />;
              })
            : availableBooks?.map((b) => {
                return <BookItem key={b.id} {...b} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default Book;
