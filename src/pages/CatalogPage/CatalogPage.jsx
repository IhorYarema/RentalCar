import css from "./CatalogPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectCarsList,
  selectCurrentPage,
  selectTotalPages,
  selectIsLoading,
} from "../../redux/cars/selectors";
import { fetchCars } from "../../redux/cars/carsSlice";
import Filters from "../../components/Filters/Filters";
import CarsList from "../../components/CarsList/CarsList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsList);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const loader = useSelector(selectIsLoading);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  // const handleSearch = () => {
  //   dispatch(fetchCars({ page: 1, limit: 12, ...filters }));
  // };
  const handleSearch = () => {
    const { brand, price, mileageFrom, mileageTo } = filters;

    const params = {};

    if (brand) params.brand = brand;
    if (price) params.price = Number(price);
    if (mileageFrom !== undefined && mileageFrom !== "")
      params.mileageFrom = mileageFrom;
    if (mileageTo !== undefined && mileageTo !== "")
      params.mileageTo = mileageTo;
    dispatch(fetchCars({ page: 1, limit: 12, ...params }));
  };

  if (loader) return <Loader />;

  return (
    <section className={css.catalogSec}>
      <div className={css.container}>
        <Filters onSearch={handleSearch} className={css.filters} />

        <CarsList
          cars={cars}
          totalPages={totalPages}
          currentPage={currentPage}
          fetchCars={fetchCars}
          className={css.carsList}
        />
      </div>
    </section>
  );
}
