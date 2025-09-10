export const selectCarsList = (state) => state.cars.list;

export const selectCurrentPage = (state) => state.cars.page;

export const selectTotalPages = (state) => state.cars.totalPages;

export const selectCurrentCar = (state) => state.cars.currentCar;

// статуси завантаження
export const selectIsLoading = (state) => state.cars.loading;
export const selectError = (state) => state.cars.error;
