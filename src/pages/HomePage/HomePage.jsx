import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <section className={css.hero_section}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <h2 className={css.lower_title}>
        Reliable and budget-friendly rentals for any journey
      </h2>
      <button type="submit" className={css.button}>
        View Catalog
      </button>
    </section>
  );
}
