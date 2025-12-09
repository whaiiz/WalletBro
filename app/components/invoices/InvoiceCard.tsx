"use client";

import { Invoice, ExpenseDetail } from "@/app/types/invoice";

interface InvoiceCardProps {
  invoice: Invoice;
  isExpanded: boolean;
  onToggle: () => void;
}

export function InvoiceCard({
  invoice,
  isExpanded,
  onToggle,
}: InvoiceCardProps) {
  const totalAmount = invoice.expenses.reduce(
    (sum, expense) => sum + expense.unitPrice,
    0
  );

  const formattedDate = new Date(invoice.createdAt).toLocaleDateString(
    "pt-PT",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="border border-gray-700 rounded-lg bg-gray-800 shadow-lg overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-750 transition-colors"
      >
        <div className="flex-1 text-left">
          <h3 className="text-lg font-semibold text-white">
            {invoice.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{formattedDate}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-green-400">
              €{totalAmount.toFixed(2)}
            </p>
            <p className="text-sm text-gray-400">
              {invoice.expenses.length} itens
            </p>
          </div>
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-700 px-6 py-4 bg-gray-900">
          <ExpenseTable expenses={invoice.expenses} />
        </div>
      )}
    </div>
  );
}

interface ExpenseTableProps {
  expenses: ExpenseDetail[];
}

function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2 px-3 text-gray-300 font-semibold">
              Descrição
            </th>
            <th className="text-right py-2 px-3 text-gray-300 font-semibold">
              Preço
            </th>
            <th className="text-center py-2 px-3 text-gray-300 font-semibold">
              Unidade
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-gray-700 hover:bg-gray-800 transition-colors"
            >
              <td className="py-3 px-3 text-gray-100">{expense.name}</td>
              <td className="py-3 px-3 text-right text-gray-100 font-semibold">
                €{expense.unitPrice.toFixed(2)}
              </td>
              <td className="py-3 px-3 text-center text-gray-400 text-xs">
                {expense.unitType}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
