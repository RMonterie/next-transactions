import { AddTransactionForm } from "./components/AddTransactionForm";

export default function AddNewTransactionPage() {
  return (
    <div className="container mt-5">
      <h1 className="font-extrabold text-3xl flex-shrink-0">New transaction</h1>
      <AddTransactionForm />
    </div>
  );
}
