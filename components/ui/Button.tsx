"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600",
    outline:
      "border-2 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const getVariantStyle = () => {
    if (variant === "primary") {
      return {
        backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)",
      };
    } else if (variant === "outline") {
      return {
        borderColor: "#2E6F40",
        color: "#2E6F40",
      };
    }
    return {};
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={getVariantStyle()}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onMouseEnter={(e) => {
        if (variant === "primary" && !disabled) {
          e.currentTarget.style.backgroundImage = "linear-gradient(to right, #214C00, #023020)";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "primary" && !disabled) {
          e.currentTarget.style.backgroundImage = "linear-gradient(to right, #2E6F40, #00674F)";
        }
      }}
    >
      {children}
    </motion.button>
  );
}
