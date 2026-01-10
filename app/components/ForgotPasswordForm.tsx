"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import { Alert } from "@/app/components/Alert";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function validateEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // Mock async request
    try {
      await new Promise((res) => setTimeout(res, 900));
      setMessage({
        type: "success",
        text: "If an account with that email exists, we've sent password reset instructions.",
      });
      setEmail("");
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
        <p className="text-sm text-gray-400">Enter your email to receive reset instructions</p>
      </div>

      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error || undefined}
          icon="📧"
          autoComplete="email"
        />

        <Button type="submit" loading={loading}>
          Send reset link
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-400">
        Remembered your password?{" "}
        <Link href="/login" className="text-blue-500 font-medium hover:text-blue-400">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
