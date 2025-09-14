import { useDispatch } from "react-redux";
import css from "./ErrorBlock.module.css";
import { fetchCarById } from "../../redux/cars/carsSlice";

const ErrorBlock = ({ error, id }) => {
  const dispatch = useDispatch();

  return (
    <div className={css.errorWrapper}>
      <p className={css.errorMessage}>Error: {error}</p>
      <button
        className={css.retryButton}
        onClick={() => dispatch(fetchCarById(id))}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorBlock;
