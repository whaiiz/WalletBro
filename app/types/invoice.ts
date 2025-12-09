export enum UnitType {
  Unit = "Unit",
  Kg = "Kg",
  Liter = "Liter",
  Meter = "Meter",
  Hour = "Hour",
}

export interface ExpenseDetail {
  id: string;
  name: string;
  unitPrice: number;
  unitType: UnitType;
  invoiceId: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  name: string;
  expenses: ExpenseDetail[];
  createdAt: string;
}
