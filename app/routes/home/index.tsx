import { useState } from "react";
import HomeHeader from "../../components/home/HomeHeader";
import BalanceSection from "../../components/home/BalanceSection";
import ActionButtons from "../../components/home/ActionButtons";
import HomeContent from "../../components/home/HomeContent";
import backgroundVideoWebm from "../assets/home-bg.webm";
import backgroundVideoMp4 from "../assets/home-bg.mp4";
import PlusIcon from "../assets/icons/plus.svg";
import SendIcon from "../assets/icons/send.svg";
import DownloadIcon from "../assets/icons/download.svg";
import EllipsisIcon from "../assets/icons/ellipsis.svg";
import GiftYellowIcon from "../assets/icons/gift-yellow.svg";
import CardIcon from "../assets/icons/card.svg";
import GiftIcon from "../assets/icons/gift.svg";
import ReceiptIcon from "../assets/icons/receipt.svg";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 이자 받기 핸들러
  const handleInterestClick = () => {
    console.log("이자 받기 클릭");
  };

  // 액션 버튼 핸들러들
  const handleFillClick = () => navigate("/fill");
  const handleSendClick = () => console.log("보내기 클릭");
  const handleReceiveClick = () => console.log("돈 받기 클릭");
  const handleMoreClick = () => console.log("더보기 클릭");

  // 거래 내역 데이터
  const transactions = [
    {
      id: 1,
      icon: GiftYellowIcon,
      iconBg: "bg-[rgba(255,198,64,0.2)]",
      amount: "+0.49 USDT",
      description: "돈 보내기 완료 럭키박스 열기",
      hasBadge: false,
    },
    {
      id: 2,
      icon: SendIcon,
      iconBg: "bg-white/20",
      amount: "-20.00 USDT",
      description: "링크 공유",
      status: "대기중",
      hasBadge: true,
      actionButton: "취소",
      onActionClick: () => console.log("거래 취소"),
    },
  ];

  // 서비스 바로가기 데이터
  const services = [
    {
      id: 1,
      icon: CardIcon,
      title: "KaiaPay 카드",
      description: "어디서나 자유롭게 결제",
      actionButton: "신청",
      iconSize: 24,
      onActionClick: () => console.log("카드 신청"),
    },
    {
      id: 2,
      icon: GiftIcon,
      title: "럭키박스",
      description: "보내기하면 열리는 보너스 혜택",
      actionButton: "받기",
      iconSize: 24,
      onActionClick: () => console.log("럭키박스 받기"),
    },
    {
      id: 3,
      icon: ReceiptIcon,
      title: "내 결제 페이지",
      description: "페이지 하나로 누구에게나 돈 받기",
      actionButton: "만들기",
      iconSize: 20,
      onActionClick: () => console.log("결제 페이지 만들기"),
    },
  ];

  // 액션 버튼 데이터
  const actions = [
    { icon: PlusIcon, label: "채우기", onClick: handleFillClick },
    { icon: SendIcon, label: "보내기", onClick: handleSendClick },
    { icon: DownloadIcon, label: "돈 받기", onClick: handleReceiveClick },
    { icon: EllipsisIcon, label: "더보기", onClick: handleMoreClick },
  ];

  // 전체 보기 핸들러
  const handleViewAll = () => {
    console.log("전체 보기 클릭");
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
        <source src={backgroundVideoWebm} type="video/webm" />
        <source src={backgroundVideoMp4} type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col">
        <HomeHeader 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />
        <BalanceSection 
          balance="10.43"
          interest="1.02 USDT"
          onInterestClick={handleInterestClick}
        />
        <ActionButtons actions={actions} />
        <HomeContent 
          transactions={transactions}
          services={services}
          onViewAll={handleViewAll}
        />
      </div>
    </div>
  );
}
