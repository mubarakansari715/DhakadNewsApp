import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/AuthSlice";

export const AuthStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});
