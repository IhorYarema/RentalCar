import css from "./CarCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  selectFavoritesIds,
} from "../../redux/favorites/favoritesSlice";
import { formatMileageSpace } from "../../utils/formatMileage";

const CarCard = ({ car }) => {
  const {
    brand,
    model,
    img,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  } = car;

  const [street, city, country] = address
    ? address.split(",").map((part) => part.trim())
    : ["", "", ""];

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalog/${car.id}`);
  };

  const dispatch = useDispatch();
  const favIds = useSelector(selectFavoritesIds);
  const isFav = favIds.includes(car.id);

  const onToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(car.id));
  };

  return (
    <div className={css.cardContainer}>
      <div className={css.imgInfoCont}>
        <div className={css.imgWrapper}>
          <img src={img} alt={model} loading="lazy" className={css.img} />
          <button
            type="button"
            onClick={onToggle}
            className={css.heartBtn}
            aria-pressed={isFav}
            title={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 34 32"
              aria-hidden="true"
              className={css.heartIcon}
            >
              <use
                href={
                  isFav
                    ? "/icons.svg#icon-heart-filled"
                    : "/icons.svg#icon-heart"
                }
              />
            </svg>
          </button>
        </div>

        <div className={css.infoBlock}>
          <p className={css.maininfo}>
            {brand} <span className={css.model}>{model}</span>,
          </p>
          <p className={css.maininfo}>{"$" + rentalPrice}</p>
        </div>

        <div className={css.lessInfoBlock}>
          <div className={css.firstpart}>
            <p className={css.lessinfo}>{city}</p>
            <p className={css.lessinfo}>{country}</p>
            <p className={css.lessinfoInc}>{rentalCompany}</p>
          </div>
          <div className={css.secondpart}>
            <p className={css.lessinfo}>{type}</p>
            <p className={css.lessinfo}>{formatMileageSpace(car.mileage)}</p>
          </div>
        </div>
      </div>

      <button onClick={handleClick} className={css.btn}>
        Read more
      </button>
    </div>
  );
};

export default CarCard;
