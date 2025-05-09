import React, { useState } from 'react';
import { useRegisterMutation } from  '../api/registerApi'
import InputField from '../ui/InputField';
import Lock from '../assets/Lock.svg';
import Profile from '../assets/Profile.svg';
import Down from '../assets/Message.svg';
import Logo from '../assets/Logo.svg';
import Background from '../assets/Background.svg';
import Carousel from '../ui/Carousel';
import FirstImg from '../assets/FirstImg.svg';
import SecondImg from '../assets/SecondImg.svg';
const Register = () => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    countryCode:''
  });
  const images = [FirstImg, SecondImg, FirstImg]
  const [register] = useRegisterMutation();
  const [passwordMismatch,setPasswordMismatch] =useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPasswordMismatch(true)
      alert("Passwords don't match!");
      return;
    }
    try {
      const { first_name, last_name, phone, email, password } = form;
      const result = await register({ first_name, last_name, phone, email, password }).unwrap();
      console.log('Registered:', result);
    } catch (err) {
      console.error('Register failed:', err);
    }
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required />
  //     <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required />
  //     <input name="phone" value={form.phone} onChange={handleChange} placeholder="Mobile Number" required />
  //     <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
  //     <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />
  //     <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" type="password" required />
  //     <button type="submit" disabled={isLoading}>Register</button>
  //     {isSuccess && <p>Registration successful!</p>}
  //     {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-9">
      <h1 className="text-3xl font-bold">Create an Account</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <InputField
          name="first_name"
          type="text"
          value={form.first_name}
          placeholder="First Name"
          icon={Profile}
          onChange={handleChange}
        />
        <InputField
          name="last_name"
          type="text"
          value={form.last_name}
          placeholder="Last Name"
          icon={Profile}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-7">
        <div className="relative w-full">
          <div className="flex bg-[#FAFAFA] placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-2xl font-semibold transition duration-300 ease p-5 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
            <select
              name="countryCode"
              value={form.countryCode}
              onChange={handleChange}
              className="bg-[#FAFAFA] flex-1/5 focus:outline-none"
            >
              <option value="+1">+1 (US)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
              <option value="+81">+81 (JP)</option>
            </select>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="bg-[#FAFAFA] w-full focus:outline-none"
              placeholder="Enter Your Number"
            />
          </div>
        </div>
        <InputField
          name="email"
          type="email"
          value={form.email}
          placeholder="Email Address"
          icon={Down}
          onChange={handleChange}
        />
      </div>

      <InputField
        name="password"
        type="password"
        value={form.password}
        placeholder="Password"
        icon={Lock}
        onChange={handleChange}
        isPasswordField
      />
      <InputField
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        placeholder="Retype Password"
        icon={Lock}
        onChange={handleChange}
        isPasswordField
      />

      {passwordMismatch && (
        <p className="text-red-500 text-sm">Passwords do not match</p>
      )}

      <div className="flex flex-col gap-8 self-center max-w-80">
        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="accent-[#47A1AD] h-6 w-6" />
          <p>
            By signing up, you agree to our{" "}
            <span className="text-[#47A1AD]">Terms</span> and{" "}
            <span className="text-[#47A1AD]">Privacy Policy</span>.
          </p>
        </div>

        <button
          type="submit"
          className="!py-4 !px-4 !bg-[#47A1AD] !rounded-full !text-white font-semibold w-full"
        >
          Create New
        </button>
      </div>
    </form>
    </div>
  );







};

export default Register;
