import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "John",
  },
  reducers: {
    addUser: (state, action) => {},
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
