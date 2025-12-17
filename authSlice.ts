import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  role: "admin" | "user" | null;
}

const savedAuth = localStorage.getItem("auth");
const initialState: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : { isAuthenticated: false, role: null };


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAdmin(state) {
      state.isAuthenticated = true;
      state.role = "admin";
    },
    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const { loginAdmin, logout } = authSlice.actions;
export default authSlice.reducer;
