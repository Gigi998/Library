import React, { SyntheticEvent, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLog';
import Error from './Error';

const Login = () => {
  const { email, setEmail, pwd, setPwd, handleLogin, error, setError } =
    useLogin();

  const emailRef = useRef<HTMLInputElement>(null);
  const errorMsg = error;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [email, pwd]);

  return (
    <section className="flex flex-col justify-center lg:w-1/3 md:w-2/3 w-5/6  border p-2 rounded-xl mx-auto mt-20">
      <Error errorMsg={errorMsg} />
      <h2 className="text-3xl mx-auto">Welcome back!</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-2xl">
            Email:
          </label>
          <input
            type="email"
            className="outline-none"
            value={email}
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pwd" className="text-2xl">
            Password:
          </label>
          <input
            type="password"
            className="outline-none"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <button
          className="w-2/5 block mx-auto bg-slate-200 mt-5 h-8"
          onClick={() => handleLogin({ email: email, pwd: pwd })}
        >
          Log in
        </button>
      </form>
      <h2>Don't have an account?</h2>
      <h2>
        <Link to="/register">Register</Link>
      </h2>
    </section>
  );
};

export default Login;
