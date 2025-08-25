import { useMemo, useState } from "react";
import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import TransactionDetailSheet from "../../components/transactions/TransactionDetailSheet";
import TransactionCell from "../../components/transactions/TransactionCell";
import {
  GetTransactionList200TransactionsItem,
  useGetTransactionList,
} from "~/generated/api";

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<GetTransactionList200TransactionsItem | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const { data } = useGetTransactionList();

  const groupedTransactions = useMemo(() => {
    return (data?.transactions ?? []).reduce<
      {
        date: string;
        totalAmount: string;
        transactions: GetTransactionList200TransactionsItem[];
      }[]
    >((acc, transaction) => {
      const date = new Date(transaction.updatedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      if (!acc.find((group) => group.date === date)) {
        acc.push({
          date,
          totalAmount: "0",
          transactions: [],
        });
      }
      const group = acc.find((group) => group.date === date);
      if (group) {
        group.transactions.push(transaction);
      }
      return acc;
    }, []);
  }, [data?.transactions]);

  const handleTransactionClick = (
    transaction: GetTransactionList200TransactionsItem
  ) => {
    setSelectedTransaction(transaction);
    setIsDetailSheetOpen(true);
  };

  const handleCancel = () => {
    console.log("거래 취소");
  };

  const handleReshare = () => {
    console.log("다시 링크 공유");
  };

  const renderTransactionItem = (
    transaction: GetTransactionList200TransactionsItem
  ) => (
    <div key={transaction.id} className="flex flex-col gap-[12px]">
      <TransactionCell
        transaction={transaction}
        onClick={handleTransactionClick}
      />
    </div>
  );

  const renderTransactionGroup = (group: {
    date: string;
    totalAmount: string;
    transactions: GetTransactionList200TransactionsItem[];
  }) => (
    <div key={group.date} className="flex flex-col gap-[8px]">
      <div className="flex justify-between items-center w-full h-[21px]">
        <span className="text-white text-[15px] font-medium leading-[1.382em] tracking-[-2%]">
          {group.date}
        </span>
        <span className="text-white/50 text-[15px] font-medium leading-[1.382em] tracking-[-2%]">
          {group.totalAmount}
        </span>
      </div>
      <div className="flex flex-col gap-[12px]">
        {group.transactions.map(renderTransactionItem)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col">
      {/* 헤더 */}
      <HeaderWithBackButton heading="거래내역" />

      {/* 콘텐츠 */}
      <div className="flex-1 flex flex-col px-[16px] pt-[24px] pb-[12px] gap-[16px]">
        {/* 거래내역 그룹 */}
        {groupedTransactions.map(renderTransactionGroup)}
      </div>

      {/* 거래 상세 시트 */}
      <TransactionDetailSheet
        isOpen={isDetailSheetOpen}
        onClose={() => setIsDetailSheetOpen(false)}
        transaction={selectedTransaction}
        onCancel={handleCancel}
      />
    </div>
  );
}
