"use client";

import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of users who already trust WalletBro
          </p>
        </div>

        <Link
          href="/signup"
          className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
        >
          Create Free Account
        </Link>

        <p className="text-blue-100 text-sm">
          No credit card required. Immediate access to all features.
        </p>
      </div>
    </section>
  );
}
