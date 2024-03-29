"use client";
const Error = ({
  theme,
  error,
  reset,
}: {
  theme: string;
  error: Error;
  reset: () => void;
}) => {
  return (
    <main className={`loading ${theme}`}>
      {error.message}
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
};

export default Error;
