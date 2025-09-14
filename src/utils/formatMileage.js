export const formatMileage = (value) => {
  if (value === null || value === undefined || value === "") return "";
  // якщо вже рядок з 'km' — видалимо непотрібне
  const num =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/\D/g, ""));
  if (Number.isNaN(num)) return String(value);
  // використаємо Intl.NumberFormat для англійської локалі з комами
  return new Intl.NumberFormat("en-US").format(num);
};
