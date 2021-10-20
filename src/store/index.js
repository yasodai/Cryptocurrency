import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../api/cryptoApi";
import { cryptoNewsApi } from "../api/cryptoNewsApi";
import counterSlice from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterSlice,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
});
