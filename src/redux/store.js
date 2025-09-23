import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "./cars/carsSlice";
import bookingReducer from "./booking/bookingSlice";
import filtersReducer from "./filters/filtersSlice";
import favoritesReducer from "./favorites/favoritesSlice";
import filtersOptionsReducer from "./filterOptions/filtersOptionsSlice"; // 👈 додаємо

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage за замовчуванням

// Конфіг для favorites
const favoritesPersistConfig = {
  key: "favorites",
  storage,
};

// Конфіг для filters
const filtersPersistConfig = {
  key: "filters",
  storage,
  whitelist: ["brand", "price", "mileageFrom", "mileageTo"],
};

const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);

const persistedFiltersReducer = persistReducer(
  filtersPersistConfig,
  filtersReducer
);

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    booking: bookingReducer,
    filters: persistedFiltersReducer,
    favorites: persistedFavoritesReducer,
    filtersOptions: filtersOptionsReducer, // 👈 додано
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
