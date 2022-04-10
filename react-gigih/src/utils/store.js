import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./tokenSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});
