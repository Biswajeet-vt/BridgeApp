import React, { useState } from "react";

interface InputFieldProps {
  name: string;
  type: string;
  value: string;
  placeholder: string;
  icon?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isPasswordField?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type,
  value,
  placeholder,
  icon,
  onChange,
  isPasswordField = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <input
        name={name}
        type={isPasswordField && !showPassword ? "password" : type}
        value={value}
        onChange={onChange}
        className="bg-[#FAFAFA] w-full placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 p-5 rounded-2xl pl-20 font-semibold transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        placeholder={placeholder}
      />
      {icon && <img src={icon} className="absolute left-4 top-4 w-6 h-6" alt="icon" />}
      {isPasswordField && (
        <button
          type="button"
          className="absolute right-4 top-4"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          <img src={icon} alt="toggle visibility" />
        </button>
      )}
    </div>
  );
};

export default InputField;










