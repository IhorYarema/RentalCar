import css from "./LoadMoreBtn.module.css";
import { useDispatch } from "react-redux";

export default function LoadMoreBtn({ nextPage, fetchAction }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchAction({ page: nextPage, limit: 12 }));
  };

  return (
    <div className={css.container}>
      <button type="button" onClick={handleClick} className={css.btn}>
        Load More
      </button>
    </div>
  );
}
