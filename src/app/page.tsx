"use client";

import { Transaction } from "@/types/transaction";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { TransactionList } from "./components/TransactionList";
import { GetAllTransactions } from "@/util/api";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>();

  const router = useRouter();

  // Helper function to calculate total amount
  const calculateTotalAmount = (transactions: Transaction[]) => {
    return transactions.reduce(
      (accumulator, transaction) => accumulator + transaction.amount,
      0
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await GetAllTransactions();
      if (data) setTransactions(data);
    };

    fetchData();
  }, []);

  const totalAmount = transactions ? calculateTotalAmount(transactions) : 0;

  return (
    <div className="container mt-5 space-y-5">
      <h1 className="font-extrabold text-3xl flex-shrink-0">
        Transaction overview
      </h1>
      <h2 className="font-bold">
        Transaction total: €{totalAmount.toFixed(2)},-
      </h2>
      <Button onClick={() => router.push(`/transactions/new`)}>
        <Plus />
        New transaction
      </Button>
      {transactions ? (
        <TransactionList transactions={transactions} />
      ) : (
        <h1 className="font-extrabold text-3xl">Loading...</h1>
      )}
    </div>
  );
}
