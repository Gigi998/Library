import { useEffect } from "react";
import StudentItem from "../components/StudentItem";
import { Outlet, useLocation } from "react-router-dom";
import { useStudentContext } from "../context/studentContext";

const Students = () => {
  const { getAllStudents, students } = useStudentContext();

  const location = useLocation();
  const loc = location.pathname;

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getAllStudents(isMounted, controller);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {loc === "/students" ? (
        <section className="main-page">
          <h2 className="text-4xl">Students</h2>
          <div className="flex items-center flex-col w-full">
            <div className="w-full">
              {students?.map((student) => {
                return <StudentItem key={student.id} {...student} />;
              })}
            </div>
          </div>
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Students;
