import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Error from './Error';
import { useStudentContext } from '../context/studentContext';

const IssueBook = () => {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { studentIssueBook, setErrorMsg, errorMsg } = useStudentContext();

  const [studentId, setStudentId] = useState('');

  const title = location.state?.title;
  const bookId = location.state?.bookId;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setStudentId('');
  };

  useEffect(() => {
    setErrorMsg('');
  }, [studentId]);

  return (
    <section className="lg:w-2/6 border p-2 rounded-xl mx-auto mt-20 flex flex-col justify-center items-center md:w-1/2 w-2/3">
      <Error errorMsg={errorMsg} />
      <h2 className="text-3xl mb-3">Issue book form</h2>
      <p className="my-3">
        Title: <span className="text-xl">{title}</span>
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">
          Provide student card ID:
          <br />
          <input
            type="text"
            name="id"
            className="outline-none"
            ref={inputRef}
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </label>
        <button
          className="w-2/6 block mx-auto bg-slate-200 mt-5 h-8"
          onClick={() => studentIssueBook({ studentId, bookId })}
        >
          Issue
        </button>
      </form>
    </section>
  );
};

export default IssueBook;
