import axios from "axios";

const instance = axios.create({
  baseURL: "https://car-rental-api.goit.global",
});

// Отримати список авто з фільтрами + пагінацією
export const getCars = async ({
  page = 1,
  limit = 12,
  brand,
  price,
  mileageFrom,
  mileageTo,
}) => {
  const params = { page, limit };

  if (brand) params.brand = brand;
  if (price != null && price !== "") params.rentalPrice = price;
  if (mileageFrom != null && mileageFrom !== "")
    params.minMileage = mileageFrom;
  if (mileageTo != null && mileageTo !== "") params.maxMileage = mileageTo;

  const { data } = await instance.get("/cars", { params });
  return data;
};

// Отримати авто за id
export const getCarById = async (id) => {
  const { data } = await instance.get(`/cars/${id}`);
  return data;
};

// Забронювати авто
export const bookCar = async (id, formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Booking successful",
        booking: { id, ...formData },
      });
    }, 1000);
  });
};
