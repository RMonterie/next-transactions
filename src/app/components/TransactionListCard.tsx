import Link from "next/link";
import { Transaction } from "@/types/transaction";
import { ChevronRight } from "lucide-react";

interface Props {
  transaction: Transaction;
}

export const TransactionListCard: React.FC<Props> = ({ transaction }) => {
  return (
    <Link href={`/transactions/${transaction.id}`}>
      <li className="border-b flex items-center justify-between p-2 hover:bg-gray-200 transition">
        <div className="flex flex-col justify-start">
          <h1 className="font-bold text-lg">{transaction.title}</h1>
          {transaction?.amount > 0 ? (
            <p>{`+${transaction.amount} EUR`}</p>
          ) : (
            <p>{`${transaction.amount} EUR`}</p>
          )}
        </div>
        <ChevronRight />
      </li>
    </Link>
  );
};
