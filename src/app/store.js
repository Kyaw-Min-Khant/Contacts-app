import { configureStore } from "@reduxjs/toolkit";
import LightSlice from "./LightSlice";
import { authApi } from "./Authapi";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    light: LightSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
