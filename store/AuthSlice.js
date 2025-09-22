import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    userLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

export const { userLogin } = authSlice.actions;
export default authSlice.reducer;
