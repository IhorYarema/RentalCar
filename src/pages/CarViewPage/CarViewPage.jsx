import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCarById } from "../../redux/cars/carsSlice.js";
import {
  selectCurrentCar,
  selectIsLoading,
  selectError,
} from "../../redux/cars/selectors";
import Loader from "../../components/Loader/Loader.jsx";
import CarDetails from "../../components/CarDetails/CarDetails";

const RecipeViewPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(selectCurrentCar);

  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id));
    }
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!car) return <p>No car found</p>;

  return <CarDetails car={car} />;
};

export default RecipeViewPage;
