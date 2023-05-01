import prisma from "../prisma";
import { Request, Response } from "express";

type GetBooksParams = {
  freeBooks: string;
};

const getAllBooks = async (
  req: Request<{}, {}, {}, GetBooksParams>,
  res: Response
) => {
  const query = req?.query;
  // If there is no query
  if (Object.keys(query).length === 0) {
    const allBooks = await prisma.book.findMany();
    if (!allBooks) return res.status(204).json({ message: "No books in db" });
    return res.json(allBooks);
  } else {
    const { freeBooks } = query;
    if (freeBooks) {
      if (freeBooks === "true") {
        // Books that are not taken
        const books = await prisma.book.findMany({
          where: { Student: { none: {} } },
        });
        return res.status(201).json(books);
      }
      if (freeBooks === "false") {
        // If it is set to false then get all books
        const allBooks = await prisma.book.findMany();
        if (!allBooks)
          return res.status(204).json({ message: "No books in db" });
        return res.json(allBooks);
      }
    }
    // wrong query params
    if (!freeBooks) {
      return res.status(403).json({ message: "Wrong query params" });
    }
  }
};

const addNewBook = async (req: Request, res: Response) => {
  const title = req?.body?.title;
  if (!title) return res.status(403).json({ message: "No title provided" });
  try {
    const newBook = await prisma.book.create({
      data: {
        title: title,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
  }
};

const deleteBook = async (req: Request, res: Response) => {
  const id = req?.body?.id;
  if (!id) return res.status(403).json({ message: "Id is required" });
  const isValidId = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });
  if (!isValidId)
    return res.status(403).json({ message: "There is no book mathes your id" });
  await prisma.book.delete({
    where: {
      id: id,
    },
  });
  return res.status(200).json({ message: `Book deleted` });
};

const getSingleBook = async (req: Request, res: Response) => {
  const bookId = req?.params?.id;
  const book = await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });
  if (book) return res.json(book);
  return res.json("err");
};

module.exports = { getAllBooks, addNewBook, deleteBook, getSingleBook };
