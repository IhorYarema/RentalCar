import css from "./HomePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectCarsList,
  selectCurrentPage,
  selectTotalPages,
  selectIsLoading,
} from "../../redux/cars/selectors";
import { fetchCars } from "../../redux/cars/carsSlise";

export default function HomePage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const loader = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  //   const handleSearch = (query) => {
  //     // dispatch(setTitleFilter(query));
  //     // dispatch(fetchCars());
  //   };

  if (loader) return <p>Loading...</p>;

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
