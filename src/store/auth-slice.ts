import type { User } from "@/common/types/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      console.log("current user in state: ", state.user);
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
