import css from "./CarCard.module.css";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className={css.cardContainer}>
      <div className={css.imgInfoCont}>
        <div className={css.imgWrapper}>
          <img src={img} alt={model} loading="lazy" className={css.img} />
          <svg
            className={css.heartIcon}
            width="16"
            height="16"
            viewBox="0 0 34 32"
          >
            <path
              fill="#f2f4f7"
              d="M17.066 5.862l-1.53-1.572c-3.59-3.691-10.174-2.417-12.55 2.223-1.116 2.182-1.367 5.333 0.67 9.355 1.963 3.872 6.046 8.51 13.41 13.562 7.364-5.052 11.445-9.69 13.41-13.562 2.037-4.023 1.788-7.172 0.67-9.355-2.377-4.64-8.96-5.916-12.55-2.225l-1.53 1.574zM17.066 32c-32.71-21.615-10.072-38.485-0.375-29.561 0.128 0.118 0.253 0.24 0.375 0.365 0.12-0.126 0.245-0.247 0.375-0.363 9.694-8.93 32.335 7.942-0.375 29.559z"
            />
          </svg>
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
            <p className={css.lessinfo}>{mileage + " km"}</p>
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
