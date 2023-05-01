import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="app-container">
      <h2 className="mb-2">Page not found!</h2>

      <Link to="/" className="bg-slate-200 rounded-lg p-2">
        Back to auth
      </Link>
    </div>
  );
};

export default ErrorPage;
