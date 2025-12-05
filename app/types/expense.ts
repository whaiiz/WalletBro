export interface Expense {
  id: string;
  title: string;
  category: "Alimentação" | "Transporte" | "Saúde" | "Entretenimento" | "Educação" | "Utilidades" | "Outro";
  amount: number;
  date: Date;
  description?: string;
}

export interface ExpenseCategory {
  name: string;
  color: string;
  icon: string;
}
