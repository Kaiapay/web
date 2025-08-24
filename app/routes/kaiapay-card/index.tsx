import React, { useState } from "react";
import { useNavigate } from "react-router";
import BottomSheet from "~/components/BottomSheet";
import Button from "~/components/Button";
import CheckIcon from "~/components/icons/CheckIcon";
import LinkIcon from "~/components/icons/LinkIcon";

const KaiaPayCard = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
  };

  const handleCloseButton = () => {
    navigate("/home", { viewTransition: true });
  };

  const handleCardApplyClick = () => {
    setIsBottomSheetOpen(true);
  };

  return (
    <div
      className="relative flex flex-col h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/grid-bg.png')",
      }}
    >
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
        <div className="w-[50px]"></div>
        <span className="flex-1 text-center font-semibold text-[17px] leading-[22px] tracking-[-0.41px] text-white/80">
          KaiaPay 카드
        </span>
        <button
          className="w-[50px] text-right font-semibold text-[14px] leading-[22px] tracking-[-0.41px] text-[#667CFF] transition-all duration-200 hover:opacity-50 active:opacity-50"
          onClick={handleCloseButton}
        >
          닫기
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4 pt-[60px] pb-[60px]">
        <div className="relative mt-[32px]">
          <img
            src="/card1.png"
            alt="Card 1"
            className="w-[206px] h-[321px] absolute top-0 left-7"
            style={{ transform: "rotate(-12.002deg)", aspectRatio: "43/67" }}
          />
          <img
            src="/card2.png"
            alt="Card 2"
            className="w-[197.483px] h-[307.502px] absolute top-[86px] right-7"
            style={{ transform: "rotate(12deg)", aspectRatio: "70/109" }}
          />
        </div>
        <div className="mt-[460px] text-[16px] font-regular leading-[22px] tracking-[-0.02em] text-[#AEAEAE]">
          암호화폐를 일상 결제로 연결하는 방법, <br />
          KaiaPay 카드가 곧 여러분을 찾아갑니다
        </div>
        <div className="h-6" />
        <div className="text-[32px] font-bold leading-[44px] tracking-[-0.03em] text-white">
          애플페이, 삼성페이
          <br />
          어디서든 크립토로 결제
        </div>
        <div className="h-6" />
        <div className="flex flex-col gap-8 p-4 pt-6 pb-4 rounded-lg bg-white/10 backdrop-blur-sm">
          {[
            {
              icon: <LinkIcon size={24} />,
              text: "전 세계 1억 3천만 개 이상의 가맹점에서 사용 가능한 가상 · 실물 카드",
            },
            {
              icon: <LinkIcon />,
              text: "Apple Pay, Google Pay 등 주요 모바일 결제 서비스와 완벽하게 호환",
            },
            {
              icon: <LinkIcon />,
              text: "사전 법정화폐 환전 불필요. KaiaPay 페이머니에서 바로 사용",
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-5">
              {item.icon}
              <span className="text-[16px] font-medium leading-[22px] tracking-[-0.1px] text-white">
                {item.text}
              </span>
            </div>
          ))}
        </div>
        <div className="h-[84px]" />
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 z-10">
        <Button
          backgroundColor="bg-white/10"
          textColor="text-white"
          className="border border-white/20 backdrop-blur-sm"
          onClick={handleCardApplyClick}
        >
          카드 미리 신청하기
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={<CheckIcon />}
        title="사전 신청 접수 완료"
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        KaiaPay 카드 출시 소식을 가장 먼저 알려드릴게요
        <br />
        함께해 주셔서 감사합니다
      </BottomSheet>
    </div>
  );
};

export default KaiaPayCard;
