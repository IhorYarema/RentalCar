import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundWrapper}>
      <h1 className={css.title}>
        <span className={css.digit}>4</span>
        <span className={css.digit}>0</span>
        <span className={css.digit}>4</span>
      </h1>
      <p className={css.message}>
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className={css.homeLink}>
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
