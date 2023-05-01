import prisma from "../prisma";
import { Request, Response } from "express";

interface GetParams {
  studentId: string;
  bookId: string;
}

const getAllStudents = async (
  req: Request<{}, {}, {}, GetParams>,
  res: Response
) => {
  const query = req.query;
  if (Object.keys(query).length === 0) {
    const allStudents = await prisma.student.findMany();
    if (!allStudents)
      return res.status(204).json({ message: "No students in db" });
    res.json(allStudents);
  } else {
    res.json("Get all stud route, query provided");
  }
};

const addBookToStudent = async (
  req: Request<{}, {}, {}, GetParams>,
  res: Response
) => {
  const query = req.query;
  const { studentId, bookId } = query;
  if (!studentId || !bookId)
    return res
      .status(403)
      .json({ message: "Student ID and bookId are required" });
  const findStudent = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });
  if (!findStudent)
    return res.status(401).json({ message: "No student matches your id" });
  const student = await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      studentBookId: bookId,
    },
  });
  return res.status(201).json(student);
};

const addNewStudent = async (req: Request, res: Response) => {
  const name = req?.body?.name;
  const email = req?.body?.email;
  const book = req?.body?.studentBookId;
  if (!name || !email)
    return res.status(403).json({ message: "Name and email are required" });
  try {
    const newUser = await prisma.student.create({
      data: {
        name: name,
        email: email,
        studentBookId: book,
      },
    });
    res.status(201).json({ message: `Student ${name} created!` });
  } catch (error) {
    console.error(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  const id = req?.body?.id;
  if (!id) return res.status(403).json({ message: "Id not provided" });
  const result = await prisma.student.delete({
    where: {
      id: id,
    },
  });
  if (!result)
    return res.status(403).json({ message: "No student with provided ID" });
  return res.json(result);
};

const getSingleStudent = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  if (!id) return res.status(403).json({ message: "No id provided" });
  const isStudent = await prisma.student.findUnique({
    where: {
      id: id,
    },
    include: { studentBook: true },
  });
  if (!isStudent)
    return res
      .status(403)
      .json({ message: "There is no student mathes your id" });
  return res.status(203).json(isStudent);
};

const removeBookFromStud = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  if (!id) return res.status(403).json({ message: "Id is required" });
  const removeBook = await prisma.student.update({
    where: {
      id: id,
    },
    data: {
      studentBookId: null,
    },
  });
  if (!removeBook) return res.json({ message: "No student" });
  return res.status(204).json(removeBook);
};

const updateStudent = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const name = req?.body?.name;
  const email = req?.body?.email;

  if (!id || !name || !email)
    return res.status(401).json({ message: "Name and email are not provided" });

  const findStud = await prisma.student.findUnique({
    where: {
      id: id,
    },
  });
  if (!findStud)
    return res.status(403).json({ message: "No student matches your id" });
  const updateStud = await prisma.student.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
    },
  });
  return res.json(updateStud);
};

module.exports = {
  addNewStudent,
  getAllStudents,
  deleteStudent,
  getSingleStudent,
  addBookToStudent,
  removeBookFromStud,
  updateStudent,
};
