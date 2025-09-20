export const selectFavoritesIds = (state) => state.favorites.ids;
export const selectIsFavorite = (state, id) => state.favorites.ids.includes(id);
