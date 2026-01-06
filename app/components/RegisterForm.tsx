"use client";

import Link from "next/link";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { Card } from "@/app/components/Card";
import { Alert } from "@/app/components/Alert";
import { useRegisterForm } from "@/app/hooks/useRegisterForm";

export function RegisterForm() {
  const { formData, errors, loading, message, handleInputChange, handleSubmit } =
    useRegisterForm();

  return (
    <Card>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white">Create Account</h1>
        <p className="text-gray-400">Sign up to start using WalletBro</p>
      </div>

      {message && (
        <div className="mb-4">
          <Alert type={message.type} message={message.text} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Your first name"
          value={formData.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
          icon="👤"
        />       

        <Input
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Your last name"
          value={formData.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
          icon="👤"
        />

        <Input
          type="date"
          name="dob"
          label="Date of Birth"
          placeholder=""
          value={formData.dob}
          onChange={handleInputChange}
          error={errors.dob}
          icon="📅"
        />

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
          autoComplete="new-password"
        />

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          icon="🔒"
          autoComplete="new-password"
        />

        <div className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded bg-gray-900 border border-gray-700 text-blue-600 cursor-pointer"
            defaultChecked
          />
          <label htmlFor="terms" className="text-gray-400">
            I accept the <span className="text-blue-500">terms and conditions</span>
          </label>
        </div>

        <Button type="submit" loading={loading}>
          Register
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 border-t border-gray-800"></div>
        <span className="text-xs text-gray-500">OR</span>
        <div className="flex-1 border-t border-gray-800"></div>
      </div>

      {/* <div className="space-y-3">
        <Button variant="secondary" disabled>
          🔵 Continue with Google
        </Button>
        <Button variant="secondary" disabled>
          🔵 Continue with Microsoft
        </Button>
      </div> */}

      <p className="mt-6 text-center text-sm text-gray-400">
        Already have an account? {" "}
        <Link href="/login" className="text-blue-500 font-medium hover:text-blue-400">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
