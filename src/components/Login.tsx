import React, { useEffect, useState } from 'react';
import {
  useAuthMutation,
  useGetWatchmenTokenMutation,
  useGetSessionIdMutation,
} from '../api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSessionId } from '../api/authSlice';
import type { RootState } from '../redux/store'; 
import { useNavigate } from 'react-router-dom';
export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [auth] = useAuthMutation();
  const [getWatchmenToken] = useGetWatchmenTokenMutation();
  const [getSessionId] = useGetSessionIdMutation();
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setSessionId(''));
  }, [dispatch]);
  useEffect(() => {
    if (sessionId) {
      navigate('/dashboard', { replace: true });
    }
  }, [sessionId, navigate]);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data  = await auth({ login, password, baseUrl: import.meta.env.VITE_USER_LOGIN_URL }).unwrap();
      
      let access_token=data?.login_basic?.tokens?.access_token
      
      const token = await getWatchmenToken({access_token,baseUrl:import.meta.env.VITE_USER_WATCHMEN_URL}).unwrap();

      let watchmenToken=token?.data?.token
      const sessionId  = await getSessionId({watchmenToken,baseUrl:import.meta.env.VITE_USER_SSO_URL}).unwrap();

      dispatch(setSessionId(sessionId?.sessionId));
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