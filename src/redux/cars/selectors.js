export const selectCarsList = (state) => state.cars.items;
export const selectCurrentPage = (state) => state.cars.currentPage;
export const selectTotalPages = (state) => state.cars.totalPages;

export const selectCurrentCar = (state) => state.cars.currentCar;
export const selectCarById = (state, id) =>
  state.cars.items.find((car) => car.id === id);

export const selectIsLoading = (state) => state.cars.loading;
export const selectError = (state) => state.cars.error;
