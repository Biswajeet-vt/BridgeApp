import React, { useState } from 'react';
import {
  useAuthMutation,
  useGetWatchmenTokenMutation,
  useGetSessionIdMutation,
} from '../api/authApi';
import { useDispatch } from 'react-redux';
import { setSessionId } from '../api/authSlice';
export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [auth] = useAuthMutation();
  const [getWatchmenToken] = useGetWatchmenTokenMutation();
  const [getSessionId] = useGetSessionIdMutation();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { accessToken } = await auth({ login, password }).unwrap();
      const { token: watchmenToken } = await getWatchmenToken({ accessToken }).unwrap();
      const { sessionId } = await getSessionId({ watchmenToken }).unwrap();
      dispatch(setSessionId(sessionId));
      console.log('Logged in with sessionId:', sessionId);
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