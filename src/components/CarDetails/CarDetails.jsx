import BookForm from "../BookForm/BookForm";
import css from "./CarDetails.module.css";
import { formatMileageSpace } from "../../utils/formatMileage";

const CarDetails = ({ car }) => {
  let imgId = "";
  const match = car.img.match(/\/(\d+)-/);
  if (match) {
    imgId = match[1];
  }

  const [street, city, country] = car.address
    ? car.address.split(",").map((part) => part.trim())
    : ["", "", ""];

  const accessoriesAndFunc = [...car.accessories, ...car.functionalities];

  return (
    <>
      <div className={css.detailsCont}>
        <div className={css.imgAndBooking}>
          <img src={car.img} alt={car.model} className={css.img} />
          <BookForm carId={car.id} />
        </div>
        <div className={css.carInfo}>
          <div className={css.markCont}>
            <h2 className={css.brandMark}>
              {car.brand} {car.model + ","} {car.year}
            </h2>
            <p className={css.idText}>{"Id: " + imgId}</p>
          </div>
          <div className={css.locCont}>
            <svg className={css.locationIcon} width="16" height="16">
              <use href="/icons.svg#icon-location" />
            </svg>
            <p className={css.mainUpperText}>{city + ", " + country}</p>
            <p className={css.mainUpperText}>
              {"Mileage: " + formatMileageSpace(car.mileage)}
            </p>
          </div>
          <h2 className={css.price}>{"$" + car.rentalPrice}</h2>
          <p className={css.mainText}>{car.description}</p>

          <div className={css.lessInfo}>
            <div className={css.rentalConditions}>
              <h3 className={css.rentTitle}>Rental Conditions:</h3>
              <ul className={css.rentList}>
                {car.rentalConditions.map((condition, index) => (
                  <li key={index} className={css.rentItem}>
                    <svg className={css.checkIcon}>
                      <use href="/icons.svg#icon-check-circle" />
                    </svg>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div className={css.specifications}>
              <h3 className={css.rentTitle}>Car Specifications:</h3>
              <ul className={css.rentList}>
                <li className={css.mainText}>
                  <svg className={css.locationIcon}>
                    <use href="/icons.svg#icon-calendar" />
                  </svg>
                  {"Year: " + car.year}
                </li>
                <li className={css.mainText}>
                  <svg className={css.locationIcon}>
                    <use href="/icons.svg#icon-car" />
                  </svg>
                  {"Type: " + car.type}
                </li>
                <li className={css.mainText}>
                  <svg className={css.locationIcon}>
                    <use href="/icons.svg#icon-fuel-pump" />
                  </svg>
                  {"Fuel Consumption " + car.fuelConsumption}
                </li>
                <li className={css.mainText}>
                  <svg className={css.locationIcon}>
                    <use href="/icons.svg#icon-gear" />
                  </svg>
                  {"Engine Size: " + car.engineSize}
                </li>
              </ul>
            </div>

            <div className={css.rentalConditions}>
              <h3 className={css.rentTitle}>
                Accessories and functionalities:
              </h3>
              <ul className={css.rentList}>
                {accessoriesAndFunc.map((item, index) => (
                  <li key={index} className={css.mainText}>
                    <svg className={css.locationIcon}>
                      <use href="/icons.svg#icon-check-circle" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
