import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsSlice";
import bookingReducer from "./booking/bookingSlice";
import filtersReducer from "./filters/filtersSlice";
import favoritesReducer, { setFavorites } from "./favorites/favoritesSlice";
import { favoritesMiddleware } from "./favorites/middleware";
import filterOptionsReducer from "./filterOptions/filtersOptionsSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    booking: bookingReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
    filtersOptions: filterOptionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
});

// Підтягуємо дані з localStorage при старті
try {
  const raw = localStorage.getItem("favoriteCars");
  if (raw) {
    store.dispatch(setFavorites(JSON.parse(raw)));
  }
} catch {
  // помилки ігноруємо
}

export default store;
