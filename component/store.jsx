import { configureStore } from "@reduxjs/toolkit";
import authContext from "./auth/xtra";
import currentEmail from "./auth/currentEmail";

const store = configureStore({
  reducer: { auth: authContext, crntEmail: currentEmail },
});

export default store;
