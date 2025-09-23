import { components } from "react-select";
import css from "./CustomDropdownIndicator.module.css";

const CustomDropdownIndicator = (props) => {
  const { menuIsOpen, selectProps } = props;
  const { value, onChange } = selectProps;

  if (menuIsOpen) {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 34 32"
          className={css.svgArrow}
          style={{ transform: "rotate(180deg)", transition: "transform 0.2s" }}
        >
          <use href="/icons.svg#icon-arrow" />
        </svg>
      </components.DropdownIndicator>
    );
  }

  if (!value) {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 34 32"
          className={css.svgArrow}
          style={{ transform: "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <use href="/icons.svg#icon-arrow" />
        </svg>
      </components.DropdownIndicator>
    );
  }

  // Опції закриті + є значення → хрестик
  return (
    <components.DropdownIndicator {...props}>
      <div
        {...props.innerProps} // важливо передати innerProps
        className={css.clearButton}
        onClick={(e) => {
          e.stopPropagation();
          onChange(null); // очищаємо значення
        }}
      >
        ✕
      </div>
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;
