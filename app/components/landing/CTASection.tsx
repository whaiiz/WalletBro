"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-xl text-blue-100">
            Junte-se a milhares de utilizadores que já confiam no WalletBro
          </p>
        </div>

        <Link
          href="/signup"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
        >
          Criar Conta Grátis
        </Link>

        <p className="text-blue-100 text-sm">
          Sem cartão de crédito necessário. Acesso imediato a todas as funcionalidades.
        </p>
      </div>
    </section>
  );
}
