"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950 px-4 py-20">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            WalletBro
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Gerencie suas finanças de forma simples, segura e inteligente
          </p>
        </div>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Controle total das suas despesas, rendimentos e investimentos em um único lugar. 
          A forma moderna de gerir o seu dinheiro.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
          <Link
            href="/signup"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Começar Agora
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Entrar
          </Link>
        </div>

        <div className="pt-12 grid grid-cols-3 gap-6 text-gray-400 text-sm">
          <div>
            <p className="text-2xl font-bold text-blue-400">50K+</p>
            <p>Utilizadores Ativos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">€1B+</p>
            <p>Sob Gestão</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">99.9%</p>
            <p>Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
}
