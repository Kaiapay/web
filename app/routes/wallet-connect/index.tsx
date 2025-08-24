import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import ContentCard from "../../components/ContentCard";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import { useState } from "react";
import BottomSheet from "~/components/BottomSheet";
import CheckIcon from "~/components/icons/CheckIcon";
import { useNavigate } from "react-router-dom";
import CheckSmallIcon from "~/components/icons/CheckSmallIcon";
import CloseXIcon from "~/components/icons/CloseXIcon";

const STORE_URLS = {
  IOS: "https://apps.apple.com/kr/app/kaia-wallet/id6502896387",
  ANDROID:
    "https://play.google.com/store/apps/details?id=io.klutch.wallet&hl=en",
  DESKTOP:
    "https://chromewebstore.google.com/detail/kaia-wallet/jblndlipeogpafnldhgmapagcccfchpi",
} as const;

const getDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "IOS";
  }
  if (/android/.test(userAgent)) {
    return "ANDROID";
  }
  return "DESKTOP";
};

export default function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
    navigate(-1);
  };

  const handleDownloadClick = () => {
    const deviceType = getDeviceType();
    window.open(STORE_URLS[deviceType], "_blank");
  };

  const handleLearnMoreClick = () => {
    // 지갑 생성 방법 알아보기 로직
    window.open("https://www.kaiawallet.io/", "_blank");
  };

  const handleConnectClick = async () => {
    // @ts-ignore
    const hasKaiaWallet = typeof window.klaytn !== "undefined";
    if (!hasKaiaWallet) {
      window.open("https://www.kaiawallet.io/", "_blank");
      return;
    }

    setIsConnecting(true);
    try {
      // @ts-ignore
      const accounts = await window.klaytn.enable();
      setConnectSuccess(accounts.length > 0);
    } catch (error) {
      setConnectSuccess(false);
      console.error(error);
    }
    setIsConnecting(false);
    setIsBottomSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col">
      {/* 헤더 */}
      <HeaderWithBackButton heading="지갑 연동하기" />

      {/* 콘텐츠 */}
      <div className="flex-1 flex flex-col px-[16px] pt-[24px] pb-[12px] gap-[12px]">
        {/* 지갑 준비하기 섹션 */}
        <ContentCard backgroundColor="bg-white/10">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white/50 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%]">
              지갑 준비하기
            </h3>

            <div className="flex flex-col gap-[20px]">
              {/* 앱 다운로드 */}
              <div className="flex gap-[12px]">
                <IconButton
                  iconSrc="/icons/arrow-circle-broken-down.svg"
                  size={40}
                />
                <div className="flex flex-col gap-[16px] flex-1 items-start">
                  <div className="flex flex-col gap-[4px]">
                    <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                      Kaia Wallet 앱 다운로드
                    </h4>
                    <p className="text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                      구글 플레이스토어 또는 앱스토어에서 무료로 다운로드하세요.
                      설치 후 실행하면 지갑을 생성하거나 불러올 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadClick}
                    className="text-[#BFF009]/80 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%] hover:opacity-80 transition-opacity"
                  >
                    다운로드 페이지로 이동
                  </button>
                </div>
              </div>

              {/* 지갑 생성 */}
              <div className="flex gap-[12px]">
                <IconButton iconSrc="/icons/wallet2.svg" size={40} />
                <div className="flex flex-col gap-[16px] flex-1 items-start">
                  <div className="flex flex-col gap-[4px]">
                    <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                      지갑 생성
                    </h4>
                    <p className="text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                      앱 설치 후 처음 이용자는 새 지갑 만들기를 선택하세요. 이미
                      다른 지갑이 있다면 가져오기로 연결할 수 있습니다.
                    </p>
                  </div>
                  <button
                    onClick={handleLearnMoreClick}
                    className="text-[#BFF009]/80 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%] hover:opacity-80 transition-opacity"
                  >
                    지갑 생성 방법 알아보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Kaia Pay와 지갑 연동 섹션 */}
        <ContentCard backgroundColor="bg-white/10">
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-white/50 text-[14px] font-medium font-pretendard leading-[1.571em] tracking-[-0.714%]">
              Kaia Pay와 지갑 연동
            </h3>

            <div className="flex gap-[12px]">
              <IconButton iconSrc="/icons/check-circle-broken.svg" size={40} />
              <div className="flex flex-col gap-[4px] flex-1 items-start">
                <h4 className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                  서명
                </h4>
                <p className="text-white/50 text-[14px] font-normal font-pretendard leading-[1.286em] tracking-[-0.714%]">
                  아래 '연동하기' 버튼을 눌러주세요. Kaia Wallet 앱이 열리며
                  서명 요청이 표시됩니다. 서명을 완료하면 KaiaPay와 지갑이
                  안전하게 연결됩니다.
                </p>
              </div>
            </div>
          </div>
        </ContentCard>
      </div>

      {/* 하단 버튼 */}
      <div className="px-[16px] pb-[24px] pt-[4px]">
        <Button
          onClick={handleConnectClick}
          backgroundColor="bg-white"
          textColor="text-black"
          className="h-[52px] rounded-full"
          isLoading={isConnecting}
        >
          연동하기
        </Button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={connectSuccess ? <CheckIcon /> : <CloseXIcon />}
        title={connectSuccess ? "지갑 연동 완료" : "지갑 연동 실패"}
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        {connectSuccess ? (
          <>
            지갑 연동이 완료되었어요.
            <br />
            페이머니를 채우고 송금을 시작해보세요.
          </>
        ) : (
          <>
            지갑 연동에 실패했어요.
            <br />
            다시 시도해주세요.
          </>
        )}
      </BottomSheet>
    </div>
  );
}
