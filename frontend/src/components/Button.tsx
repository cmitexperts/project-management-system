import clsx from "clsx";
import React from "react";

interface ButtonProps {
  icon?: React.ReactNode; // Icon can be a React node
  className?: string; // Optional className for styling
  label: string; // Label is required
  type?: "button" | "submit" | "reset"; // Type of the button
  onClick?: () => void; // Optional click handler
}

const Button: React.FC<ButtonProps> = ({
  icon,
  className,
  label,
  type = "button", // Default type is "button"
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      className={clsx("px-3 py-2 outline-none", className)}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && <span className="icon">{icon}</span>} {/* Wrap icon in a span for styling */}
    </button>
  );
};

export default Button;
