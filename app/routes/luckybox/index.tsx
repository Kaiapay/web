import { useState } from "react";
import { useNavigate } from "react-router";
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

  // 아직 열지 않은 박스들
  const unopenedBoxes: LuckyBox[] = [
    {
      id: "1",
      title: "돈 보내기 완료 럭키박스",
      date: "2025.08.20 11:34",
      isOpened: false,
    },
    {
      id: "2",
      title: "돈 받기 완료 럭키박스",
      date: "2025.08.20 11:34",
      isOpened: false,
    },
  ];

  // 열린 박스들
  const openedBoxes: LuckyBox[] = [
    {
      id: "3",
      title: "+0.49 USDT",
      date: "8월 20일 · 돈 보내기 완료 럭키박스 열기",
      amount: "+0.49 USDT",
      isOpened: true,
    },
    {
      id: "4",
      title: "+0.49 USDT",
      date: "8월 20일 · 돈 보내기 완료 럭키박스 열기",
      amount: "+0.49 USDT",
      isOpened: true,
    },
    {
      id: "5",
      title: "+0.49 USDT",
      date: "8월 20일 · 돈 보내기 완료 럭키박스 열기",
      amount: "+0.49 USDT",
      isOpened: true,
    },
    {
      id: "6",
      title: "+0.49 USDT",
      date: "8월 20일 · 돈 보내기 완료 럭키박스 열기",
      amount: "+0.49 USDT",
      isOpened: true,
    },
    {
      id: "7",
      title: "+0.49 USDT",
      date: "8월 20일 · 돈 보내기 완료 럭키박스 열기",
      amount: "+0.49 USDT",
      isOpened: true,
    },
  ];

  const totalOpenedAmount = openedBoxes.reduce((sum, box) => {
    const amount = parseFloat(
      box.amount?.replace("+", "").replace(" USDT", "") || "0"
    );
    return sum + amount;
  }, 0);

  const handleOpenBox = (box: LuckyBox) => {
    setOpenedAmount("0.99"); // 랜덤 금액으로 변경 가능
    setModalType("open");
    setIsModalOpen(true);
  };

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
              "text-[#667CFF] text-center font-pretendard text-[14px] font-medium leading-[21px] font-feature-case"
          }}
        />

        {/* 컨텐츠 */}
        <div className="px-4 space-y-6 pt-[32px]">
          {/* 아직 열지 않은 박스 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-white text-[15px] font-medium">
                아직 열지 않은 박스 ({unopenedBoxes.length})
              </h2>
            </div>
            <div className="space-y-3">
              {unopenedBoxes.map((box) => (
                <div
                  key={box.id}
                  className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-[14px] rounded-[16px]"
                >
                  <div className="w-11 h-11 rounded-[36px] bg-[rgba(255,198,64,0.2)] flex items-center justify-center">
                    <GiftIcon />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-[16px] font-medium">
                      {box.title}
                    </div>
                    <div className="text-white/50 text-[14px]">{box.date}</div>
                  </div>
                  <button
                    onClick={() => handleOpenBox(box)}
                    className="px-4 py-2 bg-white/20 backdrop-blur-[14px] rounded-[32px] text-white/90 text-[15px] font-medium"
                  >
                    열기
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 열린 박스 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-[15px] font-medium">
                열린 박스 ({openedBoxes.length})
              </h2>
              <span className="text-white/50 text-[15px] font-medium">
                +{totalOpenedAmount.toFixed(2)} USDT
              </span>
            </div>
            <div className="space-y-3">
              {openedBoxes.map((box) => (
                <div
                  key={box.id}
                  className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-[14px] rounded-[16px]"
                >
                  <div className="w-11 h-11 rounded-[36px] bg-[rgba(255,198,64,0.2)] flex items-center justify-center">
                    <GiftIcon />
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-[16px] font-medium">
                      {box.title}
                    </div>
                    <div className="text-white/50 text-[14px]">{box.date}</div>
                  </div>
                </div>
              ))}
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
