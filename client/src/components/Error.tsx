const Error = ({ errorMsg }: { errorMsg: string }) => {
  return (
    <div>
      <p
        className={
          errorMsg
            ? "realtive rounded w-full bg-rose-600 mt-2 p-2"
            : "absolute right-full"
        }
        aria-live="assertive"
      >
        {errorMsg}
      </p>
    </div>
  );
};

export default Error;
