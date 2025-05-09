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
import Message from '../assets/Message.svg'
import Lock from '../assets/Lock.svg';
import Hide from '../assets/Hide.svg';
import Carousel from '../ui/Carousel';
import FirstImg from '../assets/FirstImg.svg';
import SecondImg from '../assets/SecondImg.svg';
import Logo from '../assets/Logo.svg';
import Background from '../assets/Background.svg';
export const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch();
  const [auth] = useAuthMutation();
  const [getWatchmenToken] = useGetWatchmenTokenMutation();
  const [getSessionId] = useGetSessionIdMutation();
  const [getMiddlewareToken] = useGetMiddlewareTokenMutation();
  const images = [FirstImg, SecondImg, FirstImg]
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const apiToken = useSelector((state: RootState) => state.auth.apiToken);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const refreshToken = useSelector((state: RootState) => state.auth.refreshToken);
  const assetsToken = useSelector((state: RootState) => state.auth.assetsToken);
  console.log(apiToken, accessToken, refreshToken, assetsToken)
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
  // return (
  //   <form onSubmit={handleLogin}>
  //     <input type="email" value={login} onChange={(e) => setLogin(e.target.value)} required />
  //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  //     <button type="submit">Login</button>
  //   </form>
  // );

  return (
    <div
      className=" flex  w-full h-full flex-col md:flex-row "
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="flex md:hidden items-center justify-center text-3xl mb-10 ">
        <img src={Logo} alt="" />
        <span className="">View Trade</span>
      </div>
      <div className="w-1/2 md:block hidden">
        <Carousel slides={images} time={2000} />
      </div>
      <div className="flex items-center justify-center md:w-1/2 rounded-full bg-white py-8 px-6">
        <div className="flex flex-col md:max-w-80 md:gap-8 gap-28 ">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[32px] font-bold">Login</span>
              <p className="text-base font-normal ">
                Please enter your registered email address. We will send an OTP code
                for verification in the next step.
              </p>
            </div>
            <div className="flex flex-col gap-6 relative">
              <div className="relative">
                <input
                  id="login"
                  name="login"
                  type="email"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  className="bg-[#FAFAFA] w-full  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 p-5 rounded-2xl  font-semibold  pl-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Enter Your Email"
                />
                <button
                  className="absolute left-1 top-3 rounded py-1 px-2.5 text-center text-sm transition-all  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-[#9E9E9E]"
                  type="button"
                >
                  <img src={Message} />
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#FAFAFA] w-full  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 p-5 rounded-2xl  font-semibold  pl-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Password"
                />
                <button
                  className="absolute left-1 top-3 rounded py-1 px-2.5 text-center text-sm transition-all  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-[#9E9E9E]"
                  type="button"
                >
                  <img src={Lock} />
                </button>
                <button
                  className="absolute right-1 top-3 rounded py-1 px-2.5 text-center text-sm    bg-[#9E9E9E]"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <img src={Hide} />
                </button>
              </div>
            </div>
            <div
              className="flex items-center justify-center py-[18px] px-4 bg-[#47A1AD] rounded-full text-white"
              onClick={handleLogin}
            >
              {" "}
              Continue
            </div>
            <span className="text-[#47A1AD] text-base font-medium">
              {" "}
              Forget Password ?{" "}
            </span>
          </div>
          <div className="flex justify-center gap-1  text-base ">
            Don't have an account ? <span className="text-[#47A1AD]"> Sign up</span>
          </div>
        </div>
      </div>
    </div>
  );
};