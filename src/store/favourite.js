import { createSlice } from "@reduxjs/toolkit";
import { updateLocalStorage } from "../utils";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {},

  reducers: {
    init: (state, data) => {
      state = data.payload;
    },
    onAdd: (state, data) => {
      const { payload } = data;
      state[payload.id] = payload;
      updateLocalStorage(state);
    },
    onRemove: (state, data) => {
      const { payload } = data;
      delete state[payload.id];
      updateLocalStorage(state);
    },
  },
});

export const { onAdd, onRemove, init } = favoriteSlice.actions;
export default favoriteSlice.reducer;
