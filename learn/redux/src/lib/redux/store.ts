import { configureStore, Middleware } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { userApi } from "./user/service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { counterSlice } from "./counter";
import { pokemonApi } from "../services/pokemonApi";

const statTimeMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("🚀 Dispatching action:", action);
  const currentTime = new Date();
  const result = next(action); // 调用下一个中间件或reducer
  // 此时的state已经是更新后的状态
  console.log("💡 New state:", store.getState());
  console.log(
    "⏱️ Time taken to process action:",
    new Date().getTime() - currentTime.getTime(),
  );
  return result;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterSlice,
    [userApi.reducerPath]: userApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return (
      getDefaultMiddleware()
        .concat(statTimeMiddleware)
        // RTKQ的中间件是自动生成且必需的
        .concat(userApi.middleware)
        .concat(pokemonApi.middleware)
    );
  },
  //TODO: redux-saga
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
