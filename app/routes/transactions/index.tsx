import { useState } from "react";
import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import TransactionDetailSheet from "../../components/transactions/TransactionDetailSheet";
import TransactionCell from "../../components/transactions/TransactionCell";
import type { Transaction, TransactionGroup } from "./types/transaction";
import { useGetTransactionList } from "~/generated/api";

export default function Transactions() {
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const { data } = useGetTransactionList();
  console.log(data);
  const [transactionGroups] = useState<TransactionGroup[]>([
    {
      date: "8월 20일",
      totalAmount: "-$9.08",
      transactions: [
        {
          id: "1",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 0.49,
          currency: "USDT",
          type: "receive",
          description: "15:54 · 돈 보내기 완료 럭키박스 열기",
          method: "luckybox",
          account: "기본 페이머니",
        },
        {
          id: "2",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "send",
          description: "15:54 · 링크 공유",
          status: "pending",
          method: "link",
          recipient: "@김카이아",
          account: "기본 페이머니",
          canCancel: true,
          canReshare: true,
        },
        {
          id: "3",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "send",
          description: "15:54 · 링크 공유",
          method: "link",
          recipient: "@김카이아",
          account: "기본 페이머니",
          canReshare: true,
        },
        {
          id: "4",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "send",
          description: "15:54 · 링크 공유",
          method: "link",
          recipient: "@김카이아",
          account: "기본 페이머니",
          canReshare: true,
        },
        {
          id: "5",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 0.49,
          currency: "USDT",
          type: "interest",
          description: "15:54 · 이자 받기",
          method: "interest",
          account: "기본 페이머니",
        },
        {
          id: "6",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "receive",
          description: "15:54 · 링크 공유",
          status: "pending",
          method: "link",
          account: "기본 페이머니",
        },
        {
          id: "7",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "receive",
          description: "15:54 · 링크 공유",
          method: "link",
          recipient: "@김카이아",
          account: "기본 페이머니",
        },
        {
          id: "8",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "receive",
          description: "15:54 · 링크 공유",
          status: "pending",
          method: "link",
          account: "기본 페이머니",
        },
        {
          id: "9",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 0.49,
          currency: "USDT",
          type: "payment",
          description: "15:54 · MOBBIN.COM 결제",
          method: "payment",
          account: "기본 페이머니",
        },
        {
          id: "10",
          date: new Date(2025, 7, 20, 15, 54),
          amount: 1.49,
          currency: "USDT",
          type: "payment",
          description: "15:54 · RECRAFT 결제",
          method: "payment",
          account: "기본 페이머니",
        },
      ],
    },
    {
      date: "8월 19일",
      totalAmount: "-$18.67",
      transactions: [
        {
          id: "11",
          date: new Date(2025, 7, 19, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "send",
          description: "15:54 · 핸드폰 번호",
          status: "pending",
          method: "phone",
          recipient: "**3579",
          account: "기본 페이머니",
          canCancel: true,
        },
        {
          id: "12",
          date: new Date(2025, 7, 19, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "send",
          description: "15:54 · KaiaPay 아이디로 보내기",
          method: "id",
          recipient: "@김카이아",
          account: "기본 페이머니",
        },
        {
          id: "13",
          date: new Date(2025, 7, 19, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "send",
          description: "15:54 · 지갑으로 보내기",
          status: "pending",
          method: "wallet",
          recipient: "0x3f…9c2d",
          account: "기본 페이머니",
          canCancel: true,
        },
        {
          id: "14",
          date: new Date(2025, 7, 19, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "receive",
          description: "15:54 · 핸드폰 번호로 받음",
          method: "phone",
          account: "기본 페이머니",
        },
        {
          id: "15",
          date: new Date(2025, 7, 19, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "receive",
          description: "15:54 · KaiaPay 아이디로 받음",
          method: "id",
          recipient: "@김카이아",
          account: "기본 페이머니",
        },
        {
          id: "16",
          date: new Date(2025, 7, 19, 15, 54),
          amount: 20.0,
          currency: "USDT",
          type: "receive",
          description: "15:54 · 지갑으로 받음",
          status: "pending",
          method: "wallet",
          recipient: "0x3f…9c2d",
          account: "기본 페이머니",
        },
        {
          id: "17",
          date: new Date(2025, 7, 19, 15, 54),
          amount: 15.0,
          currency: "USDT",
          type: "send",
          description: "15:54 · 링크 공유",
          status: "cancelled",
          method: "link",
          recipient: "@김카이아",
          account: "기본 페이머니",
        },
      ],
    },
  ]);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailSheetOpen(true);
  };

  const handleCancel = () => {
    console.log("거래 취소");
  };

  const handleReshare = () => {
    console.log("다시 링크 공유");
  };

  const renderTransactionItem = (transaction: Transaction) => (
    <div key={transaction.id} className="flex flex-col gap-[12px]">
      <TransactionCell
        transaction={transaction}
        onClick={handleTransactionClick}
      />
    </div>
  );

  const renderTransactionGroup = (group: TransactionGroup) => (
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
        {transactionGroups.map(renderTransactionGroup)}
      </div>

      {/* 거래 상세 시트 */}
      <TransactionDetailSheet
        isOpen={isDetailSheetOpen}
        onClose={() => setIsDetailSheetOpen(false)}
        transaction={selectedTransaction}
        onCancel={handleCancel}
        onReshare={handleReshare}
      />
    </div>
  );
}
