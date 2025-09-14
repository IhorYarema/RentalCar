import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY = "favoriteCars";

const loadFromLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveToLocal = (arr) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));
  } catch {}
};

const initialState = {
  ids: loadFromLocal(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      const idx = state.ids.indexOf(id);
      if (idx === -1) {
        state.ids.push(id);
      } else {
        state.ids.splice(idx, 1);
      }
      saveToLocal(state.ids);
    },
    setFavorites(state, action) {
      state.ids = action.payload;
      saveToLocal(state.ids);
    },
    clearFavorites(state) {
      state.ids = [];
      saveToLocal(state.ids);
    },
  },
});

export const { toggleFavorite, setFavorites, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavoritesIds = (state) => state.favorites.ids;
export const selectIsFavorite = (state) => (id) =>
  state.favorites.ids.includes(id);
