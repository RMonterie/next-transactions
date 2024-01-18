"use client";

import { useParams } from "next/navigation";

import { getTransactionById } from "@/util/api";
import { useEffect, useState } from "react";

import { Transaction } from "@/types/transaction";
import { EditTransactionForm } from "./components/EditTransactionForm";

export default function EditTransactionsPage() {
  const [transaction, setTransaction] = useState<Transaction>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Get transaction data based on id in route params
    const fetchTransactionData = async () => {
      const { data, error } = await getTransactionById(id);

      if (data) {
        setTransaction(data);
      }
    };
    fetchTransactionData();
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="font-extrabold text-3xl flex-shrink-0">
        Edit transaction {transaction?.title}
      </h1>
      {transaction ? (
        <EditTransactionForm transaction={transaction} id={id} />
      ) : (
        <h1 className="font-extrabold text-3xl">Loading...</h1>
      )}
    </div>
  );
}
