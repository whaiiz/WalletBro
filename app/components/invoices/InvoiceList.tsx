"use client";

import { useState } from "react";
import { Invoice } from "@/app/types/invoice";
import { InvoiceCard } from "./InvoiceCard";

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [items, setItems] = useState<Invoice[]>(invoices);

  const totalInvoices = items.length;
  const totalAmount = items.reduce(
    (sum, invoice) =>
      sum + invoice.expenses.reduce((expSum, exp) => expSum + exp.unitPrice, 0),
    0
  );

  const handleToggle = (invoiceId: string) => {
    setExpandedId(expandedId === invoiceId ? null : invoiceId);
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-4 border border-blue-700">
          <p className="text-blue-200 text-sm font-medium">Total de Faturas</p>
          <p className="text-3xl font-bold text-white mt-2">{totalInvoices}</p>
        </div>
        <div className="bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-700">
          <p className="text-green-200 text-sm font-medium">Montante Total</p>
          <p className="text-3xl font-bold text-white mt-2">
            €{totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-4 border border-purple-700">
          <p className="text-purple-200 text-sm font-medium">Média por Fatura</p>
          <p className="text-3xl font-bold text-white mt-2">
            €{(totalAmount / (totalInvoices || 1)).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-white mb-4">Faturas</h2>
        {items.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
            <p className="text-gray-400">Nenhuma fatura encontrada</p>
          </div>
        ) : (
          items.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              isExpanded={expandedId === invoice.id}
              onToggle={() => handleToggle(invoice.id)}
              onUpdate={(updated) => {
                setItems((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
