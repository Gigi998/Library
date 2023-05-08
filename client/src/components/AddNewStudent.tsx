import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from '../context/studentContext';

const AddNewStudent = () => {
  const navigate = useNavigate();
  const { addStudent, setSuccessMsg, successMsg } = useStudentContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookId, setBookId] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setName('');
    setEmail('');
    setBookId('');
  };

  useEffect(() => {
    setSuccessMsg('');
  }, [name, email, bookId]);

  const delayNavigate = () => {
    setTimeout(() => {
      navigate('/students');
    }, 1000);
  };

  return (
    <div className="add-container">
      <h2 className="text-4xl mt-2">Add new Student</h2>
      {!successMsg ? (
        <p className="text-black-200 bg-green-500 p-3">
          Name and email fileds are required!
        </p>
      ) : (
        <p
          className={
            successMsg
              ? 'relative rounded w-ful bg-green-500 p-4 mb-2'
              : 'absolute left-full'
          }
        >
          {successMsg}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Name:
          <br />
          <input
            type="text"
            className="outline-none h-10 rounded-xl p-2 mt-1"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <br />
          <input
            type="email"
            className="outline-none h-10 rounded-xl p-2 mt-1"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          BookId:
          <span className="ml-36 text-slate-600">*optional</span>
          <br />
          <input
            type="text"
            className="outline-none h-10 rounded-xl p-2 mt-1"
            placeholder="BookID"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
        </label>
        <br />
        <button
          className="w-22 h-8 bg-slate-100 mt-3 rounded-xl"
          disabled={name === '' || email === '' ? true : false}
          onClick={
            bookId !== ''
              ? () => {
                  addStudent({ name, email, bookId });
                  delayNavigate();
                }
              : () => {
                  addStudent({ name, email });
                  delayNavigate();
                }
          }
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddNewStudent;
