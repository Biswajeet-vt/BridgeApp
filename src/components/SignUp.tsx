import React, { useState, type ChangeEvent } from "react";
import Down from "../assets/loginSvg/Message.svg";
import Lock from "../assets/loginSvg/Lock.svg";
import Hide from "../assets/loginSvg/Hide.svg";
import Profile from "../assets/loginSvg/Profile.svg";
import InputField from "./InputField";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    password: "",
    confirmPassword: "",
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    console.log("Form submitted successfully:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-9">
      <h1 className="text-3xl font-bold">Create an Account</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <InputField
          name="firstName"
          type="text"
          value={formData.firstName}
          placeholder="First Name"
          icon={Profile}
          onChange={handleChange}
        />
        <InputField
          name="lastName"
          type="text"
          value={formData.lastName}
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
              value={formData.countryCode}
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
              value={formData.phone}
              onChange={handleChange}
              className="bg-[#FAFAFA] w-full focus:outline-none"
              placeholder="Enter Your Number"
            />
          </div>
        </div>
        <InputField
          name="email"
          type="email"
          value={formData.email}
          placeholder="Email Address"
          icon={Down}
          onChange={handleChange}
        />
      </div>

      <InputField
        name="password"
        type="password"
        value={formData.password}
        placeholder="Password"
        icon={Lock}
        onChange={handleChange}
        isPasswordField
      />
      <InputField
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
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
  );
};

export default SignUp;