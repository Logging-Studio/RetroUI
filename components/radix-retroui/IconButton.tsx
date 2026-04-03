import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "primary" | "outline" | "link";
}

export function IconButton({
  children,
  size = "md",
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  const variantClasses = {
    primary:
      "bg-primary text-black border-2 border-black hover:bg-primary-hover",
    outline: "bg-transparent text-black border-2 border-black",
    link: "bg-transparent text-primary hover:underline",
  };

  return (
    <button
      className={`font-head border-2 border-black shadow-md hover:shadow-xs transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
