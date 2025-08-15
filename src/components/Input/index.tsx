/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  label: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

function Input({
  name,
  type,
  placeholder,
  label,
  register,
  error,
  rules,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative mb-1">
      <label
        htmlFor={name}
        className="absolute -top-3.5 left-2 bg-white px-1.5 z-10 font-bold text-md text-zinc-800 cursor-text"
      >
        {label}
      </label>
      <div className="w-full">
        <div className="relative w-full">
          <input
            className={`border ${
              error ? "border-red-600" : "border-zinc-500"
            } px-2 h-10 rounded-sm outline-none w-full pr-10`}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            {...register(name, rules)}
            id={name}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl  text-zinc-600 hover:text-black cursor-pointer"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
}

export default Input;
