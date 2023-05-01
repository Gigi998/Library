import axios from "axios";

const STUD_URL = "http://localhost:4000/api/students";
const BOOK_URL = "http://localhost:4000/api/books";
const BASE_URL = "http://localhost:4000";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const axiosStud = axios.create({
  baseURL: STUD_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosBook = axios.create({
  baseURL: BOOK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
