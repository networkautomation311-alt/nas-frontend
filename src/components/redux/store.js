import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../../app/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    // add other reducers here as needed
  },
});

export default store;
