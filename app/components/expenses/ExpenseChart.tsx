"use client";

import { Expense } from "@/app/types/expense";
import { expenseCategories } from "@/app/lib/mockExpenses";

interface ExpenseChartProps {
  expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const categoryTotals = expenses.reduce(
    (acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const sortedCategories = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a
  );

  const maxAmount = Math.max(...Object.values(categoryTotals), 1);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Despesas por Categoria</h3>

      <div className="space-y-4">
        {sortedCategories.map(([category, amount]) => {
          const percentage = (amount / maxAmount) * 100;
          const categoryInfo =
            expenseCategories[category as keyof typeof expenseCategories];

          return (
            <div key={category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{categoryInfo?.icon}</span>
                  <span className="text-sm text-gray-300">{category}</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  €{amount.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${categoryInfo?.color} transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
        <p className="text-xs text-gray-400 text-center">
          Total de {expenses.length} despesas registadas
        </p>
      </div>
    </div>
  );
}
