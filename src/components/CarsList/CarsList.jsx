import { useEffect, useRef } from "react";
import css from "./CarsList.module.css";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import CarCard from "../CarCard/CarCard";
import Loader from "../Loader/Loader";

const CarsList = ({ cars, totalPages, currentPage, fetchCars, loading }) => {
  const listRef = useRef(null);
  const prevLengthRef = useRef(0);

  // Автоматичний скрол до першої нової машини
  useEffect(() => {
    if (currentPage > 1 && listRef.current) {
      const listItems = listRef.current.querySelectorAll("li");
      const firstNewItem = listItems[prevLengthRef.current];

      if (firstNewItem) {
        setTimeout(() => {
          firstNewItem.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
    prevLengthRef.current = cars.length;
  }, [cars, currentPage]);

  return (
    <>
      <ul className={css.list} ref={listRef}>
        {Array.isArray(cars) &&
          cars.map((car) => (
            <li key={car.id} className={css.car}>
              <CarCard car={car} />
            </li>
          ))}
      </ul>

      {loading && <Loader />}

      {totalPages > 0 && currentPage < totalPages && !loading && (
        <LoadMoreBtn fetchAction={fetchCars} nextPage={currentPage + 1} />
      )}
    </>
  );
};

export default CarsList;
