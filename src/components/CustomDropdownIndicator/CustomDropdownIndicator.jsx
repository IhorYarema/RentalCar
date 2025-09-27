import { components } from "react-select";
import css from "./CustomDropdownIndicator.module.css"; // можно свой css или Filters.module.css

const CustomDropdownIndicator = (props) => {
  const { menuIsOpen, selectProps, innerProps } = props;
  const { value, onChange } = selectProps;

  // handler для "хрестика": отменяем дефолтное поведение (открытие меню) и очищаем значение
  const handleClearMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof onChange === "function") onChange(null);
  };

  // Если меню открыто — стрелка вверх
  if (menuIsOpen) {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 34 32"
          className={css.svgArrow}
          style={{ transform: "rotate(180deg)", transition: "transform 0.2s" }}
          aria-hidden
        >
          <use href="/icons.svg#icon-arrow" />
        </svg>
      </components.DropdownIndicator>
    );
  }

  // Если нет значения — стрелка вниз
  if (!value) {
    return (
      <components.DropdownIndicator {...props}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 34 32"
          className={css.svgArrow}
          style={{ transform: "rotate(0deg)", transition: "transform 0.2s" }}
          aria-hidden
        >
          <use href="/icons.svg#icon-arrow" />
        </svg>
      </components.DropdownIndicator>
    );
  }

  // Есть значение + меню закрыто → хрестик.
  // Ключевая часть: перезаписываем innerProps.onMouseDown, чтобы предотвратить открытие меню.
  const safeInnerProps = {
    ...(innerProps || {}),
    onMouseDown: handleClearMouseDown,
  };

  // Передаём изменённые innerProps в компонент, чтобы обработчик использовался внутри.
  return (
    <components.DropdownIndicator
      {...props}
      innerProps={safeInnerProps} // <- перезапись обработчика
    >
      <div className={css.clearButton} aria-hidden>
        ✕
      </div>
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;
