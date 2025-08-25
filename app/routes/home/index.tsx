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
import BottomSheet from "~/components/BottomSheet";
import ExclamationIcon from "~/components/icons/ExclamationIcon";
import Alert from "~/components/Alert";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<GetTransactionList200TransactionsItem | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [isPaymentPageSheetOpen, setIsPaymentPageSheetOpen] = useState(false);
  const [isDesktopAlertOpen, setIsDesktopAlertOpen] = useState(false);
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
  const handleFillClick = () => {
    if (!(window as any).klaytn) {
      setIsDesktopAlertOpen(true);
      return;
    }
    navigate("/fill");
  };
  const handleSendClick = () => navigate("/send");
  const handleReceiveClick = () => navigate("/receive");
  const handleMoreClick = () => {
    window.open("https://x.com/KaiaPay", "_blank");
  };

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

  // 결제 페이지 시트 핸들러들
  const handlePaymentPageSheetOpen = () => {
    setIsPaymentPageSheetOpen(true);
  };

  const handlePaymentPageSheetClose = () => {
    setIsPaymentPageSheetOpen(false);
  };

  const {
    data: transactions,
    isLoading,
    refetch: refetchTransactions,
    isRefetching,
  } = useGetTransactionList({
    limit: 5,
  });

  useEffect(() => {
    // 페이지가 포커스될 때마다 transations 새로고침
    const handleFocus = () => {
      refetchTransactions();
    };

    // 컴포넌트 마운트 시 transations 새로고침
    refetchTransactions();

    // 이벤트 리스너 등록
    window.addEventListener("focus", handleFocus);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

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
      onActionClick: handlePaymentPageSheetOpen,
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
    {
      icon: "/icons/x-logo.svg",
      label: "X/Twitter",
      onClick: handleMoreClick,
    },
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
        controls={false}
      >
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
          interest="0 USDT"
          onInterestClick={handleInterestClick}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={handleCurrencyChange}
        />
        <ActionButtons actions={actions} />
        <HomeContent
          isLoading={isLoading || isRefetching}
          transactions={transactions?.transactions?.slice(0, 5)}
          todayCount={transactions?.transactions?.length ?? 0}
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

      {/* 결제 페이지 만들기 시트 */}
      <BottomSheet
        isOpen={isPaymentPageSheetOpen}
        onClose={handlePaymentPageSheetClose}
        icon={<ExclamationIcon />}
        title="준비중인 기능입니다"
        buttonText="확인"
        onButtonClick={handlePaymentPageSheetClose}
      >
        곧 결제 페이지를 비롯한 다양한 기능이
        <br />
        업데이트를 통해 제공될 예정입니다
      </BottomSheet>

      {/* 데스크톱 지원 안내 Alert */}
      <Alert
        isOpen={isDesktopAlertOpen}
        onClose={() => setIsDesktopAlertOpen(false)}
        icon={<ExclamationIcon />}
        title="준비중"
        buttonText="확인"
        onButtonClick={() => setIsDesktopAlertOpen(false)}
      >
        {/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
          ? "현재 채우기는 데스크톱에서만 지원됩니다."
          : "현재는 카이아 월렛만 지원되며, 곧 더 다양한 월렛을 이용하실 수 있습니다."}
      </Alert>
    </div>
  );
}
