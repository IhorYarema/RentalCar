import css from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

export default function HomePage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const loader = useSelector(selectCarsIsLoading);

  return (
    <section>
      <Hero onSearch={handleSearch} />

      <div className={css.containerFilterRecList}>
        <Filters />

        {!loader && (
          <CarsList
            cars={cars}
            totalPages={totalPages}
            currentPage={currentPage}
            // nextPage={nextPage}
            fetchCars={fetchCars}
            // mode={"default"}
          />
        )}
      </div>
    </section>
  );
}
