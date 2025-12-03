"use client";

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`w-full max-w-md rounded-xl border border-gray-800 bg-gray-950 p-8 shadow-2xl ${className || ""}`}
    >
      {children}
    </div>
  );
}
