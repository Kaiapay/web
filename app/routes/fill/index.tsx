import { useState } from "react";
import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import ContentCard from "../../components/ContentCard";
import WalletConnectSheet from "../../components/fill/WalletConnectSheet";
import CurrencyInput from "../../components/fill/CurrencyInput";

export default function Fill() {
  const [amount, setAmount] = useState("0");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USDT");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleAmountChange = (amount: string) => {
    setAmount(amount);
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrencyCode(currencyCode);
  };

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col">
      {/* 헤더 */}
      <HeaderWithBackButton heading="채우기" />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col px-[16px] pt-[20px] pb-[12px] gap-[8px]">
        <ContentCard>
          <div className="flex flex-row items-center gap-[12px] justify-between">
            <div className="flex flex-row items-center gap-[12px]">
              <img
                src="/kaia-wallet.png"
                alt="Kaia Wallet"
                className="w-[32px] h-[32px]"
              />
              <p>Kaia Wallet</p>
            </div>
            <button
              onClick={handleOpenSheet}
              className="h-[40px] bg-white/20 rounded-[32px] px-[16px] text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity"
            >
              연동하기
            </button>
          </div>
        </ContentCard>

        <div className="absolute top-[149px] left-[50%] translate-x-[-50%] flex justify-center items-center my-[8px] z-50">
          <div className="w-[30px] h-[30px] rounded-full bg-black flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
              <path d="M5 1V12.3332M5 12.3332L9 8.33317M5 12.3332L1 8.33317" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <CurrencyInput
          supportedCurrencies={["KRW", "USDT", "KAIA"]}
          selectedCurrencyCode={selectedCurrencyCode}
          amount={amount}
          balance="0"
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
      </div>

      {/* 지갑 연동 시트 */}
      <WalletConnectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}
