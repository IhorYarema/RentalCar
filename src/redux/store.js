import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsSlise";
import bookingReducer from "./booking/bookingSlice";
// import favoritesReducer from "./favoritesSlice";

const store = configureStore({
  reducer: {
    cars: carsReducer,
    booking: bookingReducer,
    // favorites: favoritesReducer,
  },
});

export default store;
