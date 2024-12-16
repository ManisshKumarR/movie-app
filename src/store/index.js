import { configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "../store/favourite";

const store = configureStore({
  reducer: {
    favorite: favouriteReducer,
  },
});

export default store;
