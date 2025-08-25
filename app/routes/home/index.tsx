import { useState, useEffect } from "react";
import HomeHeader from "../../components/home/HomeHeader";
import BalanceSection from "../../components/home/BalanceSection";
import ActionButtons from "../../components/home/ActionButtons";
import HomeContent from "../../components/home/HomeContent";
import TransactionDetailSheet from "../../components/transactions/TransactionDetailSheet";
import { useNavigate } from "react-router-dom";
import { useUser } from "~/stores/userStore";
import type { Currency } from "~/types/currency";
import {
  GetTransactionList200TransactionsItem,
  useGetTransactionList,
} from "~/generated/api";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<GetTransactionList200TransactionsItem | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USDT");
  useUser();

  // 검색 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 이자 받기 핸들러
  const handleInterestClick = () => {
    console.log("이자 받기 클릭");
  };

  // 통화 변경 핸들러
  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency.code);
  };

  // 액션 버튼 핸들러들
  const handleFillClick = () => navigate("/fill");
  const handleSendClick = () => navigate("/send");
  const handleReceiveClick = () => navigate("/receive");
  const handleMoreClick = () => console.log("더보기 클릭");

  // 거래 클릭 핸들러
  const handleTransactionClick = (
    transaction: GetTransactionList200TransactionsItem
  ) => {
    setSelectedTransaction(transaction);
    setIsDetailSheetOpen(true);
  };

  const handleCancel = () => {
    console.log("거래 취소");
  };

  const { data: transactions } = useGetTransactionList({
    limit: 5,
  });

  const services = [
    {
      id: 1,
      icon: "/icons/card.svg",
      title: "KaiaPay 카드",
      description: "어디서나 자유롭게 결제",
      actionButton: "신청",
      iconSize: 24,
      onActionClick: () => navigate("/kaiapay-card"),
    },
    {
      id: 2,
      icon: "/icons/gift.svg",
      title: "럭키박스",
      description: "보내기하면 열리는 보너스 혜택",
      actionButton: "받기",
      iconSize: 24,
      onActionClick: () => navigate("/luckybox"),
    },
    {
      id: 3,
      icon: "/icons/receipt.svg",
      title: "내 결제 페이지",
      description: "페이지 하나로 누구에게나 돈 받기",
      actionButton: "만들기",
      iconSize: 20,
      onActionClick: () => console.log("결제 페이지 만들기"),
    },
  ];

  // 액션 버튼 데이터
  const actions = [
    { icon: "/icons/plus.svg", label: "채우기", onClick: handleFillClick },
    { icon: "/icons/send.svg", label: "보내기", onClick: handleSendClick },
    {
      icon: "/icons/download.svg",
      label: "돈 받기",
      onClick: handleReceiveClick,
    },
    { icon: "/icons/ellipsis.svg", label: "더보기", onClick: handleMoreClick },
  ];

  // 전체 보기 핸들러
  const handleViewAll = () => {
    navigate("/transactions");
  };

  return (
    <div className="min-h-screen bg-[#040404] relative pb-[24px]">
      <video
        className="fixed top-0 left-0 w-full h-auto max-h-screen object-cover z-0 pointer-events-none select-none"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/home-bg.webm" type="video/webm" />
        <source src="/home-bg.mp4" type="video/mp4" />
      </video>
      <div
        className="pointer-events-none select-none fixed top-0 left-0 w-full z-10"
        style={{
          height: "80px",
          background: "linear-gradient(180deg, #040404 0%, rgba(4,4,4,0) 100%)",
        }}
      />
      <div className="relative z-10 flex flex-col">
        <HomeHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <BalanceSection
          interest="1.02 USDT"
          onInterestClick={handleInterestClick}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={handleCurrencyChange}
        />
        <ActionButtons actions={actions} />
        <HomeContent
          transactions={transactions?.transactions ?? []}
          todayCount={transactions?.todayCount ?? 0}
          services={services}
          onViewAll={handleViewAll}
          onTransactionClick={handleTransactionClick}
        />
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
