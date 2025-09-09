import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookCar } from "../../api/carsApi";

export const bookCarThunk = createAsyncThunk(
  "booking/bookCar",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await bookCar(id, formData);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    success: false,
    loading: false,
    error: null,
  },
  reducers: {
    resetBooking: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookCarThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(bookCarThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookCarThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
