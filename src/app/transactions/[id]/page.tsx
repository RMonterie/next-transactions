"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { getTransactionById } from "@/util/api";
import { Transaction } from "@/types/transaction";
import { DetailsOverview } from "./components/DetailsOverview";
import { Button } from "@/components/ui/button";

export default function TransactionDetailPage() {
  const [transaction, setTransaction] = useState<Transaction>();

  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTransactionData = async () => {
      const { data, error } = await getTransactionById(id);

      if (data) {
        setTransaction(data);
      }
    };
    fetchTransactionData();
  }, [id]);

  return (
    <div className="container space-y-5 mt-5">
      <h1 className="font-extrabold text-3xl flex-shrink-0">
        Transaction details
      </h1>
      {transaction ? (
        <DetailsOverview transaction={transaction} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[40vh]">
          <h1 className="font-bold text-xl mb-2">
            No transaction with that id found!
          </h1>
          <Button onClick={() => router.push("/")}>Back to overview</Button>
        </div>
      )}
    </div>
  );
}
