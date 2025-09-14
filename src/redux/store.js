import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsSlice";
import bookingReducer from "./booking/bookingSlice";
import filtersReducer from "./filters/filtersSlice";
import favoritesReducer from "./favorites/favoritesSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    booking: bookingReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
});

export default store;
