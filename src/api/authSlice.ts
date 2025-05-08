import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  sessionId: string | null;
}
const initialState: AuthState = {
  sessionId: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    logout: (state) => {
      state.sessionId = null;
    },
  },
});
export const { setSessionId, logout } = authSlice.actions;
export default authSlice.reducer;
