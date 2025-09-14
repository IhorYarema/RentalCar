import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterField, fetchBrands } from "../../redux/filters/filtersSlice";
import css from "./Filters.module.css";
import Select from "react-select";
import { formatMileage } from "../../utils/formatMileage";

const Filters = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { brand, price, mileageFrom, mileageTo, brandsOptions, loadingBrands } =
    filters;

  // Для селекта ціни
  const priceOptions = [30, 40, 50, 60, 70, 80].map((p) => ({
    value: p,
    label: p,
  }));

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleChange = (field, value) => {
    dispatch(setFilterField({ field, value }));
  };

  return (
    <div className={css.filters}>
      {/* Бренд */}
      <label className={css.label}>
        Car brand
        <select
          value={brand}
          onChange={(e) => handleChange("brand", e.target.value)}
          className={css.brandSel}
          disabled={loadingBrands}
        >
          <option value="">Choose a brand</option>
          {brandsOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </label>
      {/* Цена */}
      {/* <label className={css.label}>
        {" "}
        Price/ 1 hour
        <Select
          value={
            priceOptions.find((opt) => opt.value === Number(price)) || null
          }
          onChange={(option) => handleChange("price", option.value)}
          options={priceOptions}
          placeholder="Choose a price"
          classNamePrefix="priceSel"
        />
      </label> */}
      <label className={css.label}>
        Price/ 1 hour
        <select
          value={price}
          onChange={(e) => handleChange("price", e.target.value)}
          className={css.priceSel}
        >
          <option value="">Choose a price</option>
          {[30, 40, 50, 60, 70, 80].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      {/* Пробег */}
      <div className={css.mil}>
        {/* Поле "From" */}
        <div className={css.inputWrapper}>
          <p className={css.label}>Сar mileage / km</p>
          <span className={css.prefixFrom}>From</span>
          <input
            type="text"
            value={mileageFrom ? formatMileage(mileageFrom) : ""}
            onChange={(e) =>
              handleChange(
                "mileageFrom",
                Number(e.target.value.replace(/,/g, ""))
              )
            }
            className={css.milInpFrom}
          />
        </div>

        {/* Поле "To" */}
        <div className={css.inputWrapper}>
          <span className={css.prefixTo}>To</span>
          <input
            type="text"
            value={mileageTo ? formatMileage(mileageTo) : ""}
            onChange={(e) =>
              handleChange(
                "mileageTo",
                Number(e.target.value.replace(/,/g, ""))
              )
            }
            className={css.milInpTo}
          />
        </div>
      </div>
      <button onClick={onSearch} className={css.btn}>
        Search
      </button>
    </div>
  );
};

export default Filters;
