"use client";

import { Expense } from "@/app/types/expense";

interface ExpenseStatsProps {
  expenses: Expense[];
}

export function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const categoryTotals = expenses.reduce(
    (acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const topCategory = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <p className="text-sm text-gray-400 mb-2">Total Despesas</p>
        <p className="text-3xl font-bold text-white">€{totalExpenses.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-2">{expenses.length} transações</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <p className="text-sm text-gray-400 mb-2">Média por Despesa</p>
        <p className="text-3xl font-bold text-blue-400">€{averageExpense.toFixed(2)}</p>
        <p className="text-xs text-gray-500 mt-2">Por transação</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <p className="text-sm text-gray-400 mb-2">Categoria Principal</p>
        <p className="text-3xl font-bold text-purple-400">
          {topCategory ? topCategory[0] : "N/A"}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          €{topCategory ? topCategory[1].toFixed(2) : "0.00"}
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <p className="text-sm text-gray-400 mb-2">Maior Despesa</p>
        <p className="text-3xl font-bold text-red-400">
          €{Math.max(...expenses.map((e) => e.amount), 0).toFixed(2)}
        </p>
        <p className="text-xs text-gray-500 mt-2">Neste período</p>
      </div>
    </div>
  );
}
