import { configureStore } from "@reduxjs/toolkit";
import authContext from "./auth/xtra";

const store = configureStore({
  reducer: { auth: authContext },
});

export default store;
