import { useBookContext } from '../context/booksContext';
import { useNavigate } from 'react-router-dom';
import { Books } from '../types/booksTypes';

const BookItem = ({ title, id }: Books) => {
  const { deleteBook, isAvailable } = useBookContext();
  const navigate = useNavigate();
  return (
    <div className="w-90 h-20 bg-cyan-600 m-10 rounded-lg p-5 flex items-center justify-between">
      <h1 className="text-slate-200 lg:text-2xl text-lg ">{title}</h1>
      {isAvailable && (
        <>
          <button
            className=" hover:bg-slate-200 rounded-lg p-3 ml-auto"
            onClick={() => deleteBook(id)}
          >
            Delete
          </button>

          <button
            className=" hover:bg-slate-200 rounded-lg p-3"
            onClick={() =>
              navigate('/issueBook', {
                state: { bookId: id, title: title },
              })
            }
          >
            Issue
          </button>
        </>
      )}
    </div>
  );
};

export default BookItem;
