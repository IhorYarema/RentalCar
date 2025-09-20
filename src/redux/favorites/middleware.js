export const favoritesMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (
    action.type.startsWith("favorites/") &&
    ["toggleFavorite", "setFavorites", "clearFavorites"].includes(
      action.type.split("/")[1]
    )
  ) {
    const state = store.getState();
    try {
      localStorage.setItem("favoriteCars", JSON.stringify(state.favorites.ids));
    } catch {
      // ігноруємо помилки
    }
  }

  return result;
};
