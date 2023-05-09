import { createContext, useContext, useState, ReactNode } from 'react';
import useAddAccToken from '../hooks/useAddAccToken';
import axios from 'axios';
import { axiosStud } from '../utils/url';
import { useNavigate } from 'react-router-dom';
import { CustomAbortController } from '../context/booksContext';
import {
  StudentType,
  AddStudent,
  IssueBookType,
  UpdateStudentType,
} from '../types/studentTypes';

type StudentContext = {
  students: StudentType[];
  errorMsg: string;
  successMsg: string;
  singleStud: StudentType | undefined;
  isUpdate: boolean;
  getAllStudents: (
    isMounted: boolean,
    controller: CustomAbortController
  ) => void;
  addStudent: ({ name, email, bookId }: AddStudent) => void;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMsg: React.Dispatch<React.SetStateAction<string>>;
  deleteStudent: (id: string) => void;
  getSingleStudent: (id: string) => void;
  studentIssueBook: ({ studentId, bookId }: IssueBookType) => void;
  returnBook: (id: string) => void;
  updateStudent: ({ id, name, email }: UpdateStudentType) => void;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentContext = createContext({} as StudentContext);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const axiosToken = useAddAccToken(axiosStud);
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentType[]>([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [singleStud, setSingleStud] = useState<StudentType | undefined>(
    undefined
  );
  const [isUpdate, setIsUpdate] = useState(false);

  const getAllStudents = async (
    isMounted: boolean,
    controller: CustomAbortController
  ) => {
    try {
      const response = await axiosToken.get('', {
        signal: controller.signal,
      });
      isMounted && setStudents(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if ((error.name = 'CanceledError')) {
          return;
        }
      } else {
        console.log(error);
        navigate('/auth', { state: { from: location }, replace: true });
      }
    }
  };

  const addStudent = async ({ name, email, bookId }: AddStudent) => {
    try {
      await axiosToken.post('', {
        name: name,
        email: email,
        studentBookId: bookId,
      });
      setSuccessMsg(`New student ${name} added!`);
    } catch (error) {
      setErrorMsg('Error');
      console.log(error);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await axiosToken.delete('', {
        data: {
          id: id,
        },
      });
      setStudents((prev) => prev?.filter((i) => i.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleStudent = async (id: string) => {
    try {
      const response = await axiosToken.get(`/${id}`);
      setSingleStud(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const studentIssueBook = async ({ studentId, bookId }: IssueBookType) => {
    try {
      await axiosToken.patch(`?studentId=${studentId}&bookId=${bookId}`);
      navigate('/students');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 403) {
          setErrorMsg('Student ID is required');
        } else if (error?.response?.status === 401) {
          setErrorMsg('No student matches your ID');
        } else {
          setErrorMsg('Server error');
        }
      } else {
        console.log(error);
      }
    }
  };

  const returnBook = async (id: string) => {
    try {
      await axiosToken.patch(`/${id}`);
      if (singleStud) {
        setSingleStud({
          ...singleStud,
          studentBookId: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateStudent = async ({ id, name, email }: UpdateStudentType) => {
    try {
      const result = await axiosToken.patch(`/${id}/update`, {
        name: name,
        email: email,
      });
      setSingleStud({ ...result.data, studentBook: singleStud?.studentBook });
      setIsUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StudentContext.Provider
      value={{
        students,
        getAllStudents,
        addStudent,
        errorMsg,
        setErrorMsg,
        successMsg,
        setSuccessMsg,
        deleteStudent,
        getSingleStudent,
        singleStud,
        studentIssueBook,
        returnBook,
        updateStudent,
        isUpdate,
        setIsUpdate,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};
