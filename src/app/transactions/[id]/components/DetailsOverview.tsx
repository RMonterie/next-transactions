"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

import { deleteTransactionById } from "@/util/api";
import { formatTimeStamp } from "@/util/formatTimeStamp";
import { Transaction } from "@/types/transaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface Props {
  transaction?: Transaction;
}

export const DetailsOverview: React.FC<Props> = ({ transaction }) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const handleDelete = () => {
    deleteTransactionById(id);
    router.push("/");
  };

  return (
    <div className="shadow px-5 py-1 flex flex-col justify-start space-y-1">
      <h2 className="font-bold text-xl p-0">{transaction?.title}</h2>
      <p>
        <b>Transaction Id: </b>
        {transaction?.id}
      </p>
      {transaction && transaction?.amount > 0 ? (
        <p>
          <b>Amount: </b>+{transaction?.amount} EUR
        </p>
      ) : (
        <p>
          <b>Amount: </b>
          {transaction?.amount} EUR
        </p>
      )}
      <p>
        <b>Description: </b>
        {transaction?.description}
      </p>
      <p>
        <b>Date: </b>
        {formatTimeStamp(transaction?.created_at)}
      </p>
      <div className="flex flex-col space-y-2 md:items-end md:space-x-2 md:flex-row">
        <Button onClick={() => router.push(`/transactions/edit/${id}`)}>
          <Pencil />
          Edit transaction
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-500 hover:bg-red-700 transition">
              <Trash2 />
              Delete transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{`Are you absolutely sure you want to delete ${transaction?.title}?`}</DialogTitle>
            </DialogHeader>
            <div className="flex justify-evenly">
              <DialogClose>
                <Button>No</Button>
              </DialogClose>
              <DialogClose>
                <Button onClick={handleDelete}>Yes</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
