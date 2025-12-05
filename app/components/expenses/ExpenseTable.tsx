"use client";

import { Expense } from "@/app/types/expense";
import { expenseCategories } from "@/app/lib/mockExpenses";

interface ExpenseTableProps {
  expenses: Expense[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
              Data
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
              Descrição
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">
              Categoria
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-300">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-gray-400">
                {expense.date.toLocaleDateString("pt-PT")}
              </td>
              <td className="px-4 py-3 text-sm text-white">
                <div>
                  <p className="font-medium">{expense.title}</p>
                  {expense.description && (
                    <p className="text-xs text-gray-400">{expense.description}</p>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-sm">
                <span className="inline-flex items-center gap-2">
                  <span>
                    {
                      expenseCategories[
                        expense.category as keyof typeof expenseCategories
                      ]?.icon
                    }
                  </span>
                  <span className="text-gray-300">{expense.category}</span>
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-right text-white font-semibold">
                €{expense.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
