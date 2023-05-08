import { Link } from 'react-router-dom';
import { useStudentContext } from '../context/studentContext';

type StudentItemType = {
  name: string;
  id: string;
};

const StudentItem = ({ name, id }: StudentItemType) => {
  const { deleteStudent } = useStudentContext();

  return (
    <div className="h-20 bg-cyan-600 m-10 rounded-lg p-5 flex items-center justify-between">
      <h1 className="text-slate-200 mr-10 text-2xl">{`${name
        .charAt(0)
        .toUpperCase()}${name.slice(1)}`}</h1>
      <Link
        to={`/students/${id}`}
        className=" hover:bg-slate-200 rounded-lg p-3 ml-auto"
      >
        Details
      </Link>
      <button
        className=" hover:bg-slate-200 rounded-lg p-3"
        onClick={() => deleteStudent(id)}
      >
        Delete
      </button>
    </div>
  );
};

export default StudentItem;
