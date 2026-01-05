"use client";

import { useState } from "react";

interface RegisterFormState {
  firstName: string;
  lastName: string;
  dob?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function useRegisterForm() {
  const [formData, setFormData] = useState<RegisterFormState>({
    firstName: "",
    lastName: "",
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

    if (!formData.firstName) {
      newErrors.firstName = "Nome é obrigatório";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Sobrenome é obrigatório";
    }

    // Date of birth
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const dobDate = new Date(formData.dob);
      const now = new Date();
      if (Number.isNaN(dobDate.getTime()) || dobDate > now) {
        newErrors.dob = "Invalid date of birth";
      } else {
        const ageDifMs = now.getTime() - dobDate.getTime();
        const ageDate = new Date(ageDifMs);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        if (age < 13) {
          newErrors.dob = "Must be at least 13 years old";
        }
      }
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const dateOfBirth = formData.dob ? new Date(formData.dob) : null;

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        dateOfBirth,
      };

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          `Error registering (${response.status})`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      setMessage({
        type: "success",
        text: "Account created successfully! Redirecting...",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : "Error registering. Please try again.";

      setMessage({
        type: "error",
        text: errorText,
      });

      console.error("Register error:", err);
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
