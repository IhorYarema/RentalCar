import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterField } from "../../redux/filters/filtersSlice";
import {
  fetchBrandsOptions,
  fetchPricesOptions,
} from "../../redux/filterOptions/filtersOptionsSlice";
import css from "./Filters.module.css";
import Select, { components } from "react-select";
import { formatMileage } from "../../utils/formatMileage";
import CustomDropdownIndicator from "../CustomDropdownIndicator/CustomDropdownIndicator";

const Filters = ({ onSearch }) => {
  const dispatch = useDispatch();

  // Підключаємо значення фільтрів
  const filters = useSelector((state) => state.filters);
  const { brand, price, mileageFrom, mileageTo } = filters;

  // Підключаємо опції селектів
  const options = useSelector((state) => state.filtersOptions);
  const { brands, prices, loadingBrands, loadingPrices } = options;

  // Стрілка для селекторів
  // const CustomDropdownIndicator = (props) => {
  //   const { menuIsOpen } = props.selectProps;
  //   return (
  //     <components.DropdownIndicator {...props}>
  //       <svg
  //         width="16"
  //         height="16"
  //         viewBox="0 0 34 32"
  //         aria-hidden="true"
  //         className={css.svgArrow}
  //         style={{
  //           transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
  //           transition: "transform 0.2s ease",
  //         }}
  //       >
  //         <use href="/icons.svg#icon-arrow" />
  //       </svg>
  //     </components.DropdownIndicator>
  //   );
  // };

  // Для значення селекту цін
  const CustomSingleValue = ({ ...props }) => {
    return (
      <components.SingleValue {...props}>
        To ${props.data.value}
      </components.SingleValue>
    );
  };

  // Підтягуємо опції при старті
  useEffect(() => {
    dispatch(fetchBrandsOptions());
    dispatch(fetchPricesOptions());
  }, [dispatch]);

  const handleChange = (field, value) => {
    dispatch(setFilterField({ field, value }));
  };

  return (
    <div className={css.filters}>
      {/* Бренд */}
      <label className={css.label}>
        Car brand
        <Select
          value={brand ? { value: brand, label: brand } : null}
          onChange={(option) =>
            handleChange("brand", option ? option.value : "")
          }
          options={brands.map((b) => ({ value: b, label: b }))}
          isDisabled={loadingBrands}
          className={css.reactSelect} // зовнішній контейнер
          classNamePrefix="react-select" // префікс для піделементів
          placeholder="Choose a brand"
          isSearchable={false}
          components={{
            DropdownIndicator: CustomDropdownIndicator,
            IndicatorSeparator: () => null,
          }}
        />
      </label>

      {/* Цена */}
      <label className={css.label}>
        Price/ 1 hour
        <Select
          value={price ? { value: price, label: price } : null}
          onChange={(option) =>
            handleChange("price", option ? option.value : "")
          }
          options={prices.map((p) => ({ value: p, label: p }))}
          isDisabled={loadingPrices}
          className={css.reactSelect}
          classNamePrefix="react-select"
          placeholder="Choose a price"
          isSearchable={false}
          components={{
            DropdownIndicator: CustomDropdownIndicator,
            IndicatorSeparator: () => null,
            SingleValue: CustomSingleValue,
          }}
        />
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
                e.target.value
                  ? Number(e.target.value.replace(/,/g, ""))
                  : undefined
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
                e.target.value
                  ? Number(e.target.value.replace(/,/g, ""))
                  : undefined
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
