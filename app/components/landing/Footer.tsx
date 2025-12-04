"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">WalletBro</h3>
            <p className="text-gray-400 text-sm">
              A forma moderna de gerir suas finanças pessoais
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Segurança
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Termos de Serviço
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; 2025 WalletBro. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-blue-400">
                Twitter
              </Link>
              <Link href="#" className="hover:text-blue-400">
                Facebook
              </Link>
              <Link href="#" className="hover:text-blue-400">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
