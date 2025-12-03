"use client";

import { ReactNode } from "react";

interface AlertProps {
  type: "error" | "success" | "warning" | "info";
  message: string;
  icon?: ReactNode;
}

export function Alert({ type, message, icon }: AlertProps) {
  const styles = {
    error: "bg-red-900/20 border border-red-800 text-red-300",
    success: "bg-green-900/20 border border-green-800 text-green-300",
    warning: "bg-yellow-900/20 border border-yellow-800 text-yellow-300",
    info: "bg-blue-900/20 border border-blue-800 text-blue-300",
  };

  const icons = {
    error: "❌",
    success: "✅",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <div className={`rounded-lg p-4 flex items-center gap-3 ${styles[type]}`}>
      <span className="text-xl">{icon || icons[type]}</span>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
