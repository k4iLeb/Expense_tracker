import { v4 as uuidv4 } from "uuid";

// *** EXPENSES ARRAY
export let expenses = [];

export function loadExpenses() {
  const savedExpenses = localStorage.getItem("expenses");
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
  }
}

// *** save to localeStorage
function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

export function addExpense(name, amount, category, date) {
  const newExpense = {
    name: name,
    amount: Math.round(amount * 100) / 100,
    category: category,
    date: date,
    id: uuidv4(),
  };

  expenses.push(newExpense);
  saveExpenses();
}

export function deleteExpense(id) {
  const index = expenses.findIndex((x) => x.id === id);
  if (index !== -1) {
    expenses.splice(index, 1);
    saveExpenses();
  }
}

export function getExpenses() {
  return [...expenses];
}
