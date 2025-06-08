import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { userApi } from "./user/service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { counterSlice } from "./counter";
import { pokemonApi } from "../services/pokemonApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterSlice,
    [userApi.reducerPath]: userApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(pokemonApi.middleware);
  },
  //TODO: redux-saga
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
