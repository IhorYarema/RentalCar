import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCars, getCarById } from "../../api/carsApi";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (filters, { rejectWithValue }) => {
    try {
      return await getCars(filters);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, { rejectWithValue }) => {
    try {
      return await getCarById(id);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    list: [],
    currentCar: null,
    page: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetCars: (state) => {
      state.list = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [...state.list, ...action.payload.cars];
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchCarById
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCars } = carsSlice.actions;
export default carsSlice.reducer;
