import css from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={css.hero_section}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <h2 className={css.lower_title}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <button type="submit" className={css.button} onClick={handleClick}>
        View Catalog
      </button>
    </section>
  );
}
