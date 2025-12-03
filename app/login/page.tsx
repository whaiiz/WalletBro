import { LoginForm } from "@/app/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
