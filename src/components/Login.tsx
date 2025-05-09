import React, { useEffect, useState } from 'react';
import {
  useAuthMutation,
  useGetWatchmenTokenMutation,
  useGetSessionIdMutation,
  useGetMiddlewareTokenMutation
} from '../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setApiToken, setAssetsToken, setRefreshToken, setSessionId } from '../api/authSlice';
import type { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [auth] = useAuthMutation();
  const [getWatchmenToken] = useGetWatchmenTokenMutation();
  const [getSessionId] = useGetSessionIdMutation();
  const [getMiddlewareToken] = useGetMiddlewareTokenMutation();

  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const apiToken = useSelector((state: RootState) => state.auth.apiToken);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
  const assetsToken = useSelector((state: RootState) => state.auth.assetsToken);
console.log(apiToken,accessToken,refreshToken,assetsToken)
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setSessionId(''));
    dispatch(setApiToken(''))
    dispatch(setAccessToken(''))
    dispatch(setRefreshToken(''))
    dispatch(setAssetsToken(''))
  }, [dispatch]);
  useEffect(() => {
    if (sessionId) {
      navigate('/dashboard', { replace: true });
    }
  }, [sessionId, navigate]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await auth({ login, password, baseUrl: import.meta.env.VITE_USER_LOGIN_URL }).unwrap();

      let access_token = data?.login_basic?.tokens?.access_token

      const token = await getWatchmenToken({ access_token, baseUrl: import.meta.env.VITE_USER_WATCHMEN_URL }).unwrap();

      let watchmenToken = token?.data?.token
      const sessionid = await getSessionId({ watchmenToken, baseUrl: import.meta.env.VITE_USER_SSO_URL }).unwrap();

      const middlewareToken = await getMiddlewareToken({ sessionId: sessionid?.sessionId, baseUrl: import.meta.env.VITE_USER_MIDDLEWARE_AUTH }).unwrap()
      dispatch(setSessionId(sessionid?.sessionId));
      dispatch(setApiToken(middlewareToken?.apiToken))
      dispatch(setAccessToken(middlewareToken?.accessToken))
      dispatch(setRefreshToken(middlewareToken?.refreshToken))
      dispatch(setAssetsToken(middlewareToken?.assetsToken))
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};