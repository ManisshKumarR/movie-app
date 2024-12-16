export const updateLocalStorage = (data) => {
  localStorage.setItem("fav", JSON.stringify(data));
};
