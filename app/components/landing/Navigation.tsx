"use client";

import Link from "next/link";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          WalletBro
        </Link>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Registar
          </Link>
        </div>
      </div>
    </nav>
  );
}
