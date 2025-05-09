import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  sessionId: string | null;
  apiToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  assetsToken: string | null;
}
const initialState: AuthState = {
  sessionId: null,
  apiToken: null,
  accessToken: null,
  refreshToken: null,
  assetsToken: null
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setApiToken: (state, action: PayloadAction<string>) => {
      state.apiToken = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    setAssetsToken: (state, action: PayloadAction<string>) => {
      state.assetsToken = action.payload;
    },
    logout: (state) => {
      state.sessionId = null;
    },
  },
});
export const { setSessionId,setAccessToken,setApiToken,setAssetsToken,setRefreshToken, logout } = authSlice.actions;
export default authSlice.reducer;
