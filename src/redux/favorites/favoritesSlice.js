import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((favId) => favId !== id);
      } else {
        state.ids.push(id);
      }
    },
    clearFavorites(state) {
      state.ids = [];
    },
    setFavorites(state, action) {
      state.ids = action.payload;
    },
  },
});

export const { toggleFavorite, clearFavorites, setFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;

// export const selectFavoritesIds = (state) => state.favorites.ids;
// export const selectIsFavorite = (state) => (id) =>
//   state.favorites.ids.includes(id);
