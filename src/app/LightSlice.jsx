import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  light: true,
  users: [],
  favorite: [],
};
const STORAGE_KKY = "favorite";
const storeFavorite = Cookies.get(STORAGE_KKY);
if (storeFavorite) {
  initialState.favorite = JSON.parse(storeFavorite);
}
export const lightSlice = createSlice({
  name: "light",
  initialState,
  reducers: {
    lightToggle: (state, { payload }) => {
      state.light = payload;
    },
    getUsers: (state, { payload }) => {
      state.users = payload;
    },
    removeUser: (state) => {
      state.users = [];
      Cookies.remove("User");
      Cookies.remove("Info");
    },
    addToFavorite: (state, { payload }) => {
      const isExisted = state.favorite.find((item) => item.id === payload.id);
      console.log(isExisted);
      if (isExisted) {
        return state;
      } else {
        state.favorite = [...state.favorite, { ...payload }];
        Cookies.set("favorite", JSON.stringify(state.favorite));
      }
    },
    removeFavorite: (state, { payload }) => {
      state.favorite = state.favorite.filter((item) => item.id !== payload.id);
      Cookies.set("favorite", JSON.stringify(state.favorite));
    },
  },
});
export const {
  lightToggle,
  getUsers,
  removeUser,
  addToFavorite,
  removeFavorite,
} = lightSlice.actions;
export default lightSlice.reducer;
