import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  title = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
