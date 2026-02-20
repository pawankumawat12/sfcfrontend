import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticate: false,
};
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      (state.user = action.payload), (state.isAuthenticate = true);
    },
    clearCredentials: (state, action) => {
      (state.user = null), (state.isAuthenticate = false);
    },
  },
});

export const { setCredentials, clearCredentials } = AuthSlice.actions;
export default AuthSlice.reducer;
