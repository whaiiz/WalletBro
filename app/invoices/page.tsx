import { mockInvoices } from "@/app/lib/mockInvoices";
import { InvoiceList } from "@/app/components/invoices/InvoiceList";

export const metadata = {
  title: "Faturas | WalletBro",
  description: "Visualize suas faturas e gastos associados",
};

export default function InvoicesPage() {
  return (
    <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Faturas</h1>
          <p className="text-gray-400">
            Visualize suas faturas e os gastos associados
          </p>
        </div>

        {/* Invoices List */}
        <InvoiceList invoices={mockInvoices} />
      </div>
    </main>
  );
}
