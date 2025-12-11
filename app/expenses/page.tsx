"use client";

import { useState } from "react";
import { mockExpenses } from "@/app/lib/mockExpenses";
import { ExpenseStats } from "@/app/components/expenses/ExpenseStats";
import { ExpenseTable } from "@/app/components/expenses/ExpenseTable";
import { ExpenseChart } from "@/app/components/expenses/ExpenseChart";
import { Navbar } from "@/app/components/Navigation/Navbar";

export default function ExpensesPage() {
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [filterCategory, setFilterCategory] = useState<string>("Todas");

  // Get unique categories
  const categories = [
    "Todas",
    ...Array.from(new Set(mockExpenses.map((e) => e.category))),
  ];

  // Filter and sort expenses
  let filteredExpenses = mockExpenses;

  if (filterCategory !== "Todas") {
    filteredExpenses = filteredExpenses.filter(
      (e) => e.category === filterCategory
    );
  }

  filteredExpenses = filteredExpenses.sort((a, b) => {
    if (sortBy === "date") {
      return b.date.getTime() - a.date.getTime();
    } else {
      return b.amount - a.amount;
    }
  });

  return (
    <>
      <Navbar title="Despesas" />
      <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">Despesas</h1>
            <p className="text-gray-400">Gerencie e visualize todas as suas despesas</p>
          </div>

          {/* Stats */}
          <ExpenseStats expenses={filteredExpenses} />

          {/* Chart */}
          <ExpenseChart expenses={mockExpenses} />

        {/* Filters and Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">
                Categoria
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="date">Data (Mais Recente)</option>
                <option value="amount">Valor (Maior)</option>
              </select>
            </div>
          </div>

          <ExpenseTable expenses={filteredExpenses} />
        </div>

        {/* Empty state */}
        {filteredExpenses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhuma despesa encontrada</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
