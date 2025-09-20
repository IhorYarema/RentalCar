import { useEffect, useRef } from "react";
import css from "./CarsList.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import CarCard from "../CarCard/CarCard";
import Loader from "../Loader/Loader";

const CarsList = ({
  cars = [],
  totalPages,
  currentPage,
  fetchCars,
  loading,
}) => {
  const listRef = useRef(null);
  const prevLengthRef = useRef(0);

  // Автоматичний скрол до першої нової машини
  useEffect(() => {
    if (currentPage > 1 && listRef.current) {
      const listItems = listRef.current.querySelectorAll("li");
      const lastNewItem = listItems[listItems.length - 1]; // остання нова машина

      if (lastNewItem) {
        setTimeout(() => {
          lastNewItem.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 100);
      }
    }
    prevLengthRef.current = cars.length;
  }, [cars, currentPage]);

  return (
    <>
      <div className={css.listCont}>
        <ul className={css.list} ref={listRef}>
          {Array.isArray(cars) &&
            cars.map((car) => (
              <li key={car.id} className={css.car}>
                <CarCard id={car.id} />
              </li>
            ))}
        </ul>

        {loading && <Loader />}

        {totalPages > 0 && currentPage < totalPages && !loading && (
          <LoadMoreBtn fetchAction={fetchCars} nextPage={currentPage + 1} />
        )}
      </div>
    </>
  );
};

export default CarsList;
