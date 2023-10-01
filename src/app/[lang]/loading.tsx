import Spinner from "./components/Spinner";
import "./loading.scss";

const Loading = ({ theme }: { theme: string }) => {
  return (
    <main className={`loading ${theme}`}>
      <div className="loading__spinnerWrapper">
        <Spinner />
      </div>
    </main>
  );
};

export default Loading;
