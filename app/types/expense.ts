export interface Expense {
  id: string;
  title: string;
  category: "Food" | "Transport" | "Health" | "Entertainment" | "Education" | "Utilities" | "Other";
  amount: number;
  date: Date;
  description?: string;
}

export interface ExpenseCategory {
  name: string;
  color: string;
  icon: string;
}
