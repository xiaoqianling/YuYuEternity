import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { userApi } from "./user/service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { counterSlice } from "./counter";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
  //TODO: redux-saga
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
