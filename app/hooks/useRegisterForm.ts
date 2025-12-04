"use client";

import { useState } from "react";

interface RegisterFormState {
  name: string;
  dob?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  name?: string;
  dob?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormState>({
    name: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Nome é obrigatório (mín. 2 caracteres)";
    }

    // Data de nascimento
    if (!formData.dob) {
      newErrors.dob = "Data de nascimento é obrigatória";
    } else {
      const dobDate = new Date(formData.dob);
      const now = new Date();
      if (Number.isNaN(dobDate.getTime()) || dobDate > now) {
        newErrors.dob = "Data de nascimento inválida";
      } else {
        // checar idade mínima de 13 anos
        const ageDifMs = now.getTime() - dobDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 13) {
          newErrors.dob = "Deve ter pelo menos 13 anos";
        }
      }
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As palavras-passe não coincidem";
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

    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage(null);

    try {
      // TODO: Implementar integração com API de registo
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error("Registo não implementado");
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Erro no registo",
      });
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
