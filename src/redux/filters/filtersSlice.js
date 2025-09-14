import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCars } from "../../api/carsApi";
import axios from "axios";

const initialState = {
  brand: "",
  price: "",
  mileageFrom: "",
  mileageTo: "",
  brandsOptions: [],
  pricesOptions: [],
  loadingBrands: false,
  errorBrands: null,
  loadingPrices: false,
  errorPrices: null,
};

export const fetchBrands = createAsyncThunk(
  "filters/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://car-rental-api.goit.global/brands"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPrices = createAsyncThunk(
  "filters/fetchPrices",
  async (_, thunkAPI) => {
    try {
      const { cars } = await getCars({ page: 1, limit: 1000 }); // побольше, чтобы собрать все цены
      const prices = [...new Set(cars.map((c) => Number(c.rentalPrice)))]
        .filter(Boolean)
        .sort((a, b) => a - b);
      return prices;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      // brands
      .addCase(fetchBrands.pending, (state) => {
        state.loadingBrands = true;
        state.errorBrands = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsOptions = action.payload;
        state.loadingBrands = false;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loadingBrands = false;
        state.errorBrands = action.payload;
      })
      // prices
      .addCase(fetchPrices.pending, (state) => {
        state.loadingPrices = true;
        state.errorPrices = null;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.pricesOptions = action.payload;
        state.loadingPrices = false;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.loadingPrices = false;
        state.errorPrices = action.payload;
      });
  },
});

export const { setFilterField, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
