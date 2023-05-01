import { BrowserRouter, Routes, Route } from "react-router-dom";
import Book from "./pages/Book";
import Students from "./pages/Students";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthCheck from "./components/AuthCheck";
import AddNewStudent from "./components/AddNewStudent";
import IssueBook from "./components/IssueBook";
import SingleStudent from "./components/SingleStudent";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
        {/* Protected routes */}
        <Route element={<AuthCheck />}>
          <Route path="/" element={<Book />} />
        </Route>
        <Route element={<AuthCheck />}>
          <Route path="/issueBook" element={<IssueBook />} />
        </Route>
        <Route element={<AuthCheck />}>
          <Route path="/students" element={<Students />}>
            <Route path=":id" element={<SingleStudent />} />
          </Route>
        </Route>
        <Route element={<AuthCheck />}>
          <Route path="/addStudent" element={<AddNewStudent />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
