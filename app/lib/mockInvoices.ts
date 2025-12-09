import { Invoice, ExpenseDetail, UnitType } from "@/app/types/invoice";

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    name: "Compras Supermercado",
    createdAt: new Date(2025, 11, 1).toISOString(),
    expenses: [
      {
        id: "1-1",
        name: "Arroz",
        unitPrice: 2.5,
        unitType: UnitType.Kg,
        invoiceId: "1",
        createdAt: new Date(2025, 11, 1).toISOString(),
      },
      {
        id: "1-2",
        name: "Feijão",
        unitPrice: 1.8,
        unitType: UnitType.Kg,
        invoiceId: "1",
        createdAt: new Date(2025, 11, 1).toISOString(),
      },
      {
        id: "1-3",
        name: "Leite",
        unitPrice: 1.2,
        unitType: UnitType.Liter,
        invoiceId: "1",
        createdAt: new Date(2025, 11, 1).toISOString(),
      },
    ],
  },
  {
    id: "2",
    name: "Restaurante",
    createdAt: new Date(2025, 11, 5).toISOString(),
    expenses: [
      {
        id: "2-1",
        name: "Francesinha",
        unitPrice: 12.5,
        unitType: UnitType.Unit,
        invoiceId: "2",
        createdAt: new Date(2025, 11, 5).toISOString(),
      },
      {
        id: "2-2",
        name: "Cerveja",
        unitPrice: 3.0,
        unitType: UnitType.Unit,
        invoiceId: "2",
        createdAt: new Date(2025, 11, 5).toISOString(),
      },
      {
        id: "2-3",
        name: "Sobremesa",
        unitPrice: 6.0,
        unitType: UnitType.Unit,
        invoiceId: "2",
        createdAt: new Date(2025, 11, 5).toISOString(),
      },
    ],
  },
  {
    id: "3",
    name: "Combustível",
    createdAt: new Date(2025, 11, 3).toISOString(),
    expenses: [
      {
        id: "3-1",
        name: "Gasolina 95",
        unitPrice: 50.0,
        unitType: UnitType.Unit,
        invoiceId: "3",
        createdAt: new Date(2025, 11, 3).toISOString(),
      },
    ],
  },
  {
    id: "4",
    name: "Farmácia",
    createdAt: new Date(2025, 11, 7).toISOString(),
    expenses: [
      {
        id: "4-1",
        name: "Medicamento A",
        unitPrice: 15.99,
        unitType: UnitType.Unit,
        invoiceId: "4",
        createdAt: new Date(2025, 11, 7).toISOString(),
      },
      {
        id: "4-2",
        name: "Medicamento B",
        unitPrice: 8.5,
        unitType: UnitType.Unit,
        invoiceId: "4",
        createdAt: new Date(2025, 11, 7).toISOString(),
      },
    ],
  },
];
