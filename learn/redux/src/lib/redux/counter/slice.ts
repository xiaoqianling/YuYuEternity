import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    step: 1,
  },
  reducers: {
    increment: (state) => {
      state.count += state.step;
    },
    decrement: (state) => {
      state.count -= state.step;
    },
    setStep: (state, action: { payload: number; type: string }) => {
      state.step = action.payload;
    },
    incrementByAmount: (state, action: { payload: number; type: string }) => {
      state.count += action.payload;
    },
    decrementByAmount: (state, action: { payload: number; type: string }) => {
      state.count -= action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  setStep,
  incrementByAmount,
  decrementByAmount,
} = counterSlice.actions;
export default counterSlice.reducer;
