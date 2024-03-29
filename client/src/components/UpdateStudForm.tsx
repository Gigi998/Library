import { SyntheticEvent, useState } from 'react';
import { UpdateStudentType } from '../types/studentTypes';
import { useStudentContext } from '../context/studentContext';

const UpdateStudForm = ({ id, name, email }: UpdateStudentType) => {
  const { updateStudent, setIsUpdate } = useStudentContext();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const [nameUpd, setNameUpd] = useState(name);
  const [emailUpd, setEmailUpd] = useState(email);

  const handleUpdate = () => {
    updateStudent({ id, name: nameUpd, email: emailUpd });
    setIsUpdate(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg mt-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 md:w-1/2 w-3/4"
      >
        <label>
          Name:
          <br />
          <input
            type="text"
            className="outline-none h-10 rounded-xl p-2 mt-1 w-full"
            placeholder="Name"
            value={nameUpd}
            onChange={(e) => setNameUpd(e.target.value)}
          />
        </label>
        <label>
          Email:
          <br />
          <input
            type="email"
            className="outline-none h-10 rounded-xl p-2 mt-1 w-full"
            placeholder="Email"
            value={emailUpd}
            onChange={(e) => setEmailUpd(e.target.value)}
          />
        </label>
        <button
          className="bg-slate-300 hover:bg-slate-200 rounded-lg p-3 w-2/5 mx-auto text-xl"
          disabled={!emailUpd || !nameUpd ? true : false}
          onClick={handleUpdate}
        >
          Update
        </button>
      </form>
      <button
        onClick={() => setIsUpdate(false)}
        className="bg-slate-300 hover:bg-slate-200 rounded-lg xl:block xl:max-xl:block  p-3 w-30 absolute top-0 left-[-200px] text-lg hidden"
      >
        Back to Student
      </button>
    </div>
  );
};

export default UpdateStudForm;
