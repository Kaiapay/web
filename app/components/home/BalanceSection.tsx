import { useState } from "react";
import BottomSheet from "../BottomSheet";
import CheckIcon from "../icons/CheckIcon";
import XCircleIcon from "../icons/XCircleIcon";
import CurrencySelector from "../CurrencySelector";
import ChevronDownIcon from "../icons/chevron-down";
import type { Currency } from "~/types/currency";
import { getCurrencyBalance } from "~/lib/currency";

interface BalanceSectionProps {
  balance: string;
  interest: string;
  onInterestClick: () => void;
  selectedCurrency?: string;
  onCurrencyChange?: (currency: Currency) => void;
}

export default function BalanceSection({
  balance,
  interest,
  onInterestClick,
  selectedCurrency = "USDT",
  onCurrencyChange,
}: BalanceSectionProps) {
  const [isInterestSheetOpen, setIsInterestSheetOpen] = useState(false);
  const [isCurrencySelectorOpen, setIsCurrencySelectorOpen] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInterestClick = () => {
    // TODO: API 연동 후 오류 상태 결정
    const hasError = parseFloat(interest) === 0;
    setIsError(hasError);
    setIsInterestSheetOpen(true);
    onInterestClick();
  };

  const handleCurrencySelect = (currency: Currency) => {
    if (onCurrencyChange) {
      onCurrencyChange(currency);
    }
  };

  const currentBalance = getCurrencyBalance(selectedCurrency);

  return (
    <div className="text-center pt-[72px] pb-[48px] px-2 font-pretendard">
      <p className="text-[#FCFAFF] text-[16px] leading-[1.19] tracking-[-0.056em]">
        기본 페이머니 · 쌓인 이자 {interest}
      </p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <h1 className="text-white font-semibold leading-[1.4] tracking-[-0.019em] h-[72px]">
          <span className="text-[48px]">{currentBalance.split(".")[0]}</span>
          <span className="text-[24px]">
            .{currentBalance.split(".")[1]} {selectedCurrency}
          </span>
        </h1>
        {onCurrencyChange && (
          <button
            onClick={() => setIsCurrencySelectorOpen(true)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronDownIcon />
          </button>
        )}
      </div>
      <button
        onClick={handleInterestClick}
        className="h-[40px] bg-white/20 backdrop-blur-[14px] rounded-[32px] px-[16px] text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity"
      >
        이자 받기
      </button>

      {/* 이자 받기 BottomSheet */}
      <BottomSheet
        isOpen={isInterestSheetOpen}
        onClose={() => setIsInterestSheetOpen(false)}
        icon={isError ? <XCircleIcon /> : <CheckIcon color="#BFF009" />}
        title={
          isError ? (
            "이자를 받을 수 없어요"
          ) : (
            <>
              이자 {interest}
              <br />
              페이머니에 쏙!
            </>
          )
        }
        buttonText="확인"
      >
        {isError ? (
          <>
            받을 이자가 없어요.
            <br />
            현재 이율 약 1.02%
          </>
        ) : (
          <>
            거래 내역 상세에서 자세한 내용을
            <br />
            확인할 수 있어요. 현재 이율 약 1.02%
          </>
        )}
      </BottomSheet>

      {/* 통화 선택 시트 */}
      <CurrencySelector
        isOpen={isCurrencySelectorOpen}
        onClose={() => setIsCurrencySelectorOpen(false)}
        onCurrencySelect={handleCurrencySelect}
      />
    </div>
  );
}
