"use client";

import { useState } from "react";
import { Invoice, ExpenseDetail, UnitType } from "@/app/types/invoice";

interface Props {
  invoice: Invoice;
  onSave: (updated: Invoice) => void;
  onCancel: () => void;
}

function formatDateForInput(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseDateInput(value: string) {
  if (!value) return new Date().toISOString();
  const d = new Date(value);
  return d.toISOString();
}

export function InvoiceEditor({ invoice, onSave, onCancel }: Props) {
  const [name, setName] = useState(invoice.name);
  const [createdAt, setCreatedAt] = useState(formatDateForInput(invoice.createdAt));
  const [expenses, setExpenses] = useState<ExpenseDetail[]>(
    invoice.expenses.map((e) => ({ ...e }))
  );

  function updateExpense(idx: number, patch: Partial<ExpenseDetail>) {
    setExpenses((prev) => {
      const copy = prev.map((e) => ({ ...e }));
      copy[idx] = { ...copy[idx], ...patch };
      return copy;
    });
  }

  function addExpense() {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setExpenses((prev) => [
      ...prev,
      {
        id,
        name: "Novo item",
        unitPrice: 0,
        unitType: UnitType.Unit,
        invoiceId: invoice.id,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function removeExpense(idx: number) {
    setExpenses((prev) => prev.filter((_, i) => i !== idx));
  }

  function save() {
    const updated: Invoice = {
      ...invoice,
      name: name.trim() || invoice.name,
      createdAt: parseDateInput(createdAt),
      expenses: expenses.map((e) => ({ ...e })),
    };
    onSave(updated);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onCancel} />
      <div className="relative w-full max-w-3xl bg-gray-900 border border-gray-700 rounded-lg p-6 text-white shadow-lg z-10">
        <h3 className="text-xl font-semibold mb-4">Editar Fatura</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Data</label>
            <input
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Despesas</h4>
            <button onClick={addExpense} className="text-sm text-blue-400">Adicionar</button>
          </div>

          <div className="space-y-3 max-h-64 overflow-auto">
            {expenses.map((exp, idx) => (
              <div key={exp.id} className="bg-gray-800 border border-gray-700 rounded p-3 grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
                <input
                  value={exp.name}
                  onChange={(e) => updateExpense(idx, { name: e.target.value })}
                  className="col-span-2 px-2 py-1 bg-transparent border border-gray-700 rounded text-white"
                />

                <input
                  type="number"
                  value={String(exp.unitPrice)}
                  onChange={(e) => updateExpense(idx, { unitPrice: Number(e.target.value) || 0 })}
                  className="px-2 py-1 bg-transparent border border-gray-700 rounded text-white w-full"
                />

                <div className="flex items-center gap-2">
                  <select
                    value={exp.unitType}
                    onChange={(e) => updateExpense(idx, { unitType: e.target.value as UnitType })}
                    className="px-2 py-1 bg-transparent border border-gray-700 rounded text-white"
                  >
                    {Object.values(UnitType).map((ut) => (
                      <option key={ut} value={ut}>{ut}</option>
                    ))}
                  </select>

                  <button onClick={() => removeExpense(idx)} className="text-sm text-red-400">Remover</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-700 rounded">Cancelar</button>
          <button onClick={save} className="px-4 py-2 bg-green-600 rounded">Guardar</button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceEditor;
