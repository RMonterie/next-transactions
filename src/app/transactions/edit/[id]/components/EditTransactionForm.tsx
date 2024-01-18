import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { editTransaction } from "@/util/api";
import { Transaction } from "@/types/transaction";

interface Props {
  transaction?: Transaction;
  id: string;
}

export const EditTransactionForm: React.FC<Props> = ({ transaction, id }) => {
  const [formData, setFormData] = useState({
    title: transaction?.title || "",
    amount: transaction?.amount || 0,
    description: transaction?.description || "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title?.trim() || formData.amount === 0) {
      setError("Required fields are missing.");
    } else {
      const { error } = await editTransaction(
        id,
        formData.title,
        formData.amount,
        formData.description
      );
      if (!error) {
        router.push("/");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <Input
        type="text"
        name="title"
        value={formData?.title}
        onChange={handleChange}
      />
      <label htmlFor="amount">Amount</label>
      <Input
        type="number"
        name="amount"
        value={formData?.amount}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <Input
        type="text"
        name="description"
        value={formData?.description}
        onChange={handleChange}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="mt-2">
        Save changes
      </Button>
    </form>
  );
};
