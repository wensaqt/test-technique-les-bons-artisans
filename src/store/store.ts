import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-slice";
import { productsReducer } from "./products-slice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const dispatch = store.dispatch;

export default store;
