import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import GiftIcon from "~/components/icons/GiftIcon";
import OpenGiftBoxIcon from "~/components/icons/OpenGiftBoxIcon";
import BottomSheet from "~/components/BottomSheet";

interface LuckyBox {
  id: string;
  title: string;
  date: string;
  amount?: string;
  isOpened: boolean;
}

export default function LuckyBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"open" | "info">("open");
  const [openedAmount, setOpenedAmount] = useState("0.99");

  const handleInfoClick = () => {
    setModalType("info");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (modalType === "open") {
      // 박스 열기 로직
      console.log("박스 열기 완료");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#040404]">
        {/* 헤더 */}
        <HeaderWithBackButton
          heading="럭키박스"
          rightButton={{
            text: "안내",
            onClick: handleInfoClick,
            className:
              "text-[#667CFF] text-center font-pretendard text-[14px] font-medium leading-[21px] font-feature-case",
          }}
        />

        {/* 컨텐츠 */}
        <div className="px-4 space-y-6 pt-[32px]">
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-[rgba(255,198,64,0.2)] flex items-center justify-center mb-4">
              <GiftIcon width={32} height={32} />
            </div>
            <div className="text-white/30 text-[14px] text-center">
              곧 다양한 보상과 함께
              <br />
              럭키박스 기능이 업데이트될 예정이에요
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <BottomSheet
        isOpen={isModalOpen}
        onClose={handleModalClose}
        icon={<OpenGiftBoxIcon size={24} />}
        title={
          modalType === "open" ? (
            <>
              <p>{openedAmount} USDT</p>
              <p>받았어요</p>
            </>
          ) : (
            "럭키박스 받는 방법"
          )
        }
        buttonText="확인"
        onButtonClick={handleModalConfirm}
      >
        {modalType === "open" ? (
          <>
            <p>럭키박스에서 받은 금액은</p>
            <p>페이머니에 바로 넣어드렸어요</p>
          </>
        ) : (
          <>
            링크, 휴대폰 번호, KaiaPay 아이디로
            <br />
            10 USDT 이상 주고받을 때마다
            <br />
            0.00~1.00 USDT 랜덤 보상을 드려요!
          </>
        )}
      </BottomSheet>
    </>
  );
}
