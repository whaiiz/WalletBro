"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const pathname = usePathname();

  const isInvoicesPage = pathname === "/invoices";
  const isExpensesPage = pathname === "/expenses";
  const isUploadPage = pathname === "/upload";

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-blue-400">💰</div>
            <h1 className="text-xl font-semibold text-white">
              {title || "WalletBro"}
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/invoices"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isInvoicesPage
                  ? "text-blue-400 bg-gray-700"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              Faturas
            </Link>

            <Link
              href="/expenses"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isExpensesPage
                  ? "text-blue-400 bg-gray-700"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8.16 2.75a.75.75 0 00-1.32 0l-1.424 4.573H1.75a.75.75 0 00-.733.567.747.747 0 00.208.816l3.829 2.864-.96 3.081a.75.75 0 00.275.853.75.75 0 00.836-.15l3.095-2.323 3.095 2.323a.75.75 0 00.836.15.75.75 0 00.275-.853l-.96-3.081 3.829-2.864a.75.75 0 00-.734-1.383h-3.663L8.16 2.75z" />
              </svg>
              Despesas
            </Link>

            <Link
              href="/upload"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isUploadPage
                  ? "text-blue-400 bg-gray-700"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 17a1 1 0 001 1h12a1 1 0 001-1v-4a1 1 0 10-2 0v3H5v-3a1 1 0 10-2 0v4z" />
                <path d="M7 9a1 1 0 011-1h2V3a1 1 0 112 0v5h2a1 1 0 110 2h-2v5a1 1 0 11-2 0v-5H8a1 1 0 01-1-1z" />
              </svg>
              Upload
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.5 1.5H19A1.5 1.5 0 0120.5 3v16a1.5 1.5 0 01-1.5 1.5H10.5a.75.75 0 010-1.5H19a.75.75 0 00.75-.75V3a.75.75 0 00-.75-.75H10.5a.75.75 0 010-1.5z" />
                <path d="M5.22 4.97a.75.75 0 00-1.06 1.06L6.44 8H1.75a.75.75 0 000 1.5h4.69l-2.28 2.28a.75.75 0 101.06 1.06l3.5-3.5a.75.75 0 000-1.06l-3.5-3.5z" />
              </svg>
              <span className="hidden md:inline">Sair</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
