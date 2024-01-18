import { Transaction } from "@/types/transaction";
import { TransactionListCard } from "./TransactionListCard";

interface Props {
  transactions?: Transaction[];
}

export const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <ul className="shadow">
      {transactions?.map((transaction) => (
        <TransactionListCard key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
};
