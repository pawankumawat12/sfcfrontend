import React, { forwardRef } from "react";
import Select from "react-select";

const CommonSelect = forwardRef(
  (
    {
      label,
      name,
      options = [],
      placeholder = "Select option",
      error = "",
      required = false,
      isMulti = false,
      isDisabled = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    const customStyles = {
      control: (base, state) => ({
        ...base,
        minHeight: "44px",
        borderRadius: "0.5rem",
        borderColor: state.isFocused ? "#6366f1" : "#d1d5db",
        boxShadow: state.isFocused
          ? "0 0 0 3px rgba(99,102,241,0.1)"
          : "none",
        backgroundColor: "transparent",
        
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "0 12px",
      }),
      input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
      }),
      placeholder: (base) => ({
        ...base,
        fontSize: "0.875rem",
        color: "#9ca3af",
      }),
      singleValue: (base) => ({
        ...base,
        fontSize: "0.875rem",
        color: "var(--color-gray-400)",
      }),
      menu: (base) => ({
        ...base,
        borderRadius: "0.5rem",
        zIndex: 50,
      }),
      option: (base, state) => ({
        ...base,
        fontSize: "0.875rem",
        backgroundColor: state.isSelected
          ? "#6366f1"
          : state.isFocused
          ? "#eef2ff"
          : "white",
        color: state.isSelected ? "white" : "#1f2937",
        cursor: "pointer",
      }),
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            {label}
            {required && <span className="text-error-500"> *</span>}
          </label>
        )}

        <Select
          ref={ref}
          name={name}
          options={options}
          placeholder={placeholder}
          isMulti={isMulti}
          isDisabled={isDisabled}
          styles={customStyles}
          className={`react-select-container ${className}`}
          classNamePrefix="react-select"
          {...rest}
        />

        {/* Error */}
        {error && <p className="mt-1 text-xs text-error-500">* {error}</p>}
      </div>
    );
  }
);

CommonSelect.displayName = "CommonSelect";

export default CommonSelect;
