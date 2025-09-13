import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterField, fetchBrands } from "../../redux/filters/filtersSlice";
import css from "./Filters.module.css";

const Filters = ({ onSearch }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const { brand, price, mileageFrom, mileageTo, brandsOptions, loadingBrands } =
    filters;

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleChange = (field, value) => {
    dispatch(setFilterField({ field, value }));
  };

  return (
    <div className={css.filters}>
      {/* Бренд */}
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

      {/* Цена */}
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

      {/* Пробег */}
      <div className={css.mil}>
        {/* Поле "From" */}
        <div className={css.inputWrapper}>
          <span className={css.prefix}>From</span>
          <input
            type="number"
            value={mileageFrom}
            onChange={(e) => handleChange("mileageFrom", e.target.value)}
            className={css.milInp}
          />
        </div>

        {/* Поле "To" */}
        <div className={css.inputWrapper}>
          <span className={css.prefix}>To</span>
          <input
            type="number"
            value={mileageTo}
            onChange={(e) => handleChange("mileageTo", e.target.value)}
            className={css.milInp}
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
