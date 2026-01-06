import { Invoice, ExpenseDetail, UnitType } from "@/app/types/invoice";

export const mockInvoices: Invoice[] = [
  {
    id: "1",
    name: "Grocery Shopping",
    createdAt: new Date(2025, 11, 1).toISOString(),
    expenses: [
      {
        id: "1-1",
        name: "Rice",
        unitPrice: 2.5,
        unitType: UnitType.Kg,
        invoiceId: "1",
        createdAt: new Date(2025, 11, 1).toISOString(),
      },
      {
        id: "1-2",
        name: "Beans",
        unitPrice: 1.8,
        unitType: UnitType.Kg,
        invoiceId: "1",
        createdAt: new Date(2025, 11, 1).toISOString(),
      },
      {
        id: "1-3",
        name: "Milk",
        unitPrice: 1.2,
        unitType: UnitType.Liter,
        invoiceId: "1",
        createdAt: new Date(2025, 11, 1).toISOString(),
      },
    ],
  },
  {
    id: "2",
    name: "Restaurant",
    createdAt: new Date(2025, 11, 5).toISOString(),
    expenses: [
      {
        id: "2-1",
        name: "Sandwich",
        unitPrice: 12.5,
        unitType: UnitType.Unit,
        invoiceId: "2",
        createdAt: new Date(2025, 11, 5).toISOString(),
      },
      {
        id: "2-2",
        name: "Beer",
        unitPrice: 3.0,
        unitType: UnitType.Unit,
        invoiceId: "2",
        createdAt: new Date(2025, 11, 5).toISOString(),
      },
      {
        id: "2-3",
        name: "Dessert",
        unitPrice: 6.0,
        unitType: UnitType.Unit,
        invoiceId: "2",
        createdAt: new Date(2025, 11, 5).toISOString(),
      },
    ],
  },
  {
    id: "3",
    name: "Fuel",
    createdAt: new Date(2025, 11, 3).toISOString(),
    expenses: [
      {
        id: "3-1",
        name: "Gasoline 95",
        unitPrice: 50.0,
        unitType: UnitType.Unit,
        invoiceId: "3",
        createdAt: new Date(2025, 11, 3).toISOString(),
      },
    ],
  },
  {
    id: "4",
    name: "Pharmacy",
    createdAt: new Date(2025, 11, 7).toISOString(),
    expenses: [
      {
        id: "4-1",
        name: "Medicine A",
        unitPrice: 15.99,
        unitType: UnitType.Unit,
        invoiceId: "4",
        createdAt: new Date(2025, 11, 7).toISOString(),
      },
      {
        id: "4-2",
        name: "Medicine B",
        unitPrice: 8.5,
        unitType: UnitType.Unit,
        invoiceId: "4",
        createdAt: new Date(2025, 11, 7).toISOString(),
      },
    ],
  },
];
