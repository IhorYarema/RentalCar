import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  price: "",
  mileageFrom: "",
  mileageTo: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetFilters: () => initialState,
  },
});

export const { setFilterField, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
