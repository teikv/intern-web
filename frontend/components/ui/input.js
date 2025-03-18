"use client";
import React from "react";

const Input = React.forwardRef(({ type = "text", placeholder, className, ...props }, ref) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      ref={ref}
      className={`w-full p-2 border border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;
