import React, { SyntheticEvent, useState } from "react";
import { useBookContext } from "../context/booksContext";

const AddNewBook = () => {
  const { addNewBook } = useBookContext();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    setSearch("");
    e.preventDefault();
  };
  return (
    <div className="add-container">
      <h2 className="text-4xl mt-2">Add new book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <br />
          <input
            type="text"
            className="outline-none h-10 rounded-xl p-2 mt-1"
            placeholder="Book title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <br />
        <button
          className="w-full bg-slate-100 mt-3 rounded-xl h-8"
          onClick={() => addNewBook(search)}
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
