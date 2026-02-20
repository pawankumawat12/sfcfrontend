import React, { useState, forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder = "",
      name,
      onChange,
      onBlur,
      error = "",
      className = "",
      iconRight,
      iconLeft,
      passwordToggle = false,
      required = false,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType = passwordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-gray-700 ">
            {label}
            {required && <span className="text-error-500"> *</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {/* Left Icon */}
          {iconLeft && (
            <span className="absolute left-4 text-gray-500 ">{iconLeft}</span>
          )}

          <input
            ref={ref}
            name={name}
            type={inputType}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            className={` h-11 w-full rounded-lg border border-gray-300 
              bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs 
              placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden 
              focus:ring-3 focus:ring-brand-500/10 
              ${iconLeft ? "pl-11" : ""}
              ${iconRight || passwordToggle ? "pr-11" : ""}
              ${className}
            `}
            {...rest}
          />

          {/* Right Icon / Password Toggle */}
          {(iconRight || passwordToggle) && (
            <span
              onClick={() => passwordToggle && setShowPassword((prev) => !prev)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 
                text-gray-500  
                ${passwordToggle ? "cursor-pointer" : "pointer-events-none"}
              `}
            >
              {typeof iconRight === "function"
                ? iconRight(showPassword)
                : iconRight}
            </span>
          )}
        </div>

        {/* Error */}
        {error && <p className="mt-1 text-xs text-error-500">** {error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
