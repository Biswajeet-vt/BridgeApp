import React, { useState, type ChangeEvent } from "react";
import Down from "../assets/loginSvg/Message.svg";
import Lock from "../assets/loginSvg/Lock.svg";
import Hide from "../assets/loginSvg/Hide.svg";

export interface FormData {
  login: string;
  password: string;
}

function Credentials() {
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here (e.g., sending data to an API)
  };
  return (
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
              value={formData.login}
              onChange={handleChange}
              className="bg-[#FAFAFA] w-full  placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 p-5 rounded-2xl  font-semibold  pl-20 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Enter Your Email"
            />
            <button
              className="absolute left-1 top-3 rounded py-1 px-2.5 text-center text-sm transition-all  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none bg-[#9E9E9E]"
              type="button"
            >
              <img src={Down} />
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
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
          onClick={handleSubmit}
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
        Don’t have an account ? <span className="text-[#47A1AD]"> Sign up</span>
      </div>
    </div>
  );
}

export default Credentials;
