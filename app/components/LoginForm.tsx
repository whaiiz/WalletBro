"use client";

import Link from "next/link";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import { Alert } from "@/app/components/Alert";
import { useLoginForm } from "@/app/hooks/useLoginForm";

export function LoginForm() {
  const { formData, errors, loading, message, handleInputChange, handleSubmit } =
    useLoginForm();

  return (
    <Card>
      {/* Header */}
      <div className="mb-8 space-y-2 text-center">
        <h1 className="text-3xl font-bold text-white">WalletBro</h1>
        <p className="text-gray-400">Sign in to your wallet</p>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-6">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          icon="📧"
          autoComplete="email"
        />

        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          icon="🔒"
          autoComplete="current-password"
        />

        {/* Remember me and Forgot password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded bg-gray-900 border border-gray-700 text-blue-600 cursor-pointer"
              defaultChecked
            />
            <span className="text-gray-400">Keep me signed in</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-400 transition-colors"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button type="submit" loading={loading}>
          Sign in
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 border-t border-gray-800"></div>
        <span className="text-xs text-gray-500">OR</span>
        <div className="flex-1 border-t border-gray-800"></div>
      </div>

      {/* Social Login Buttons */}
      {/* <div className="space-y-3">
        <Button variant="secondary" disabled>
          🔵 Continue with Google
        </Button>
        <Button variant="secondary" disabled>
          🔵 Continue with Microsoft
        </Button>
      </div> */}

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-500 font-medium hover:text-blue-400 transition-colors"
        >
          Sign up now
        </Link>
      </p>
    </Card>
  );
}
