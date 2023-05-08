import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BookContextProvider } from './context/booksContext';
import { AuthContextProvider } from './context/authContext';
import { StudentProvider } from './context/studentContext';

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <StudentProvider>
          <BookContextProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BookContextProvider>
        </StudentProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
