"use client";

import { useState } from "react";

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

export function useLoginForm() {
  const [formData, setFormData] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.password) {
      newErrors.password = "Palavra-passe é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Palavra-passe deve ter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // Call the proxy API route
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          "Email ou palavra-passe incorretos";
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Store token if provided
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      setMessage({
        type: "success",
        text: "Login realizado com sucesso! Redirecionando...",
      });

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      const errorText =
        error instanceof Error
          ? error.message
          : "Erro ao fazer login. Tente novamente.";

      setMessage({
        type: "error",
        text: errorText,
      });

      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    message,
    handleInputChange,
    handleSubmit,
  };
}
