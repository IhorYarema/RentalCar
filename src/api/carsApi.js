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
  const params = {
    page,
    limit,
  };

  if (brand) params.brand = brand;
  if (price) params.price = price;
  if (mileageFrom) params.mileageFrom = mileageFrom;
  if (mileageTo) params.mileageTo = mileageTo;

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
  const { data } = await instance.post(`/cars/${id}/book`, formData);
  return data;
};
