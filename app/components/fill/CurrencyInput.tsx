import { useState } from "react";
import ContentCard from "../ContentCard";
import ChevronDownIcon from "~/components/icons/chevron-down";
import CurrencySelector from "../CurrencySelector";
import type { Currency } from "~/types/currency";
import { allCurrencies, getCurrencyBalance } from "~/lib/currency";

interface CurrencyInputProps {
  supportedCurrencies: string[]; // ["KRW", "USDT", "KAIA"]
  selectedCurrencyCode: string;
  amount: string;
  balance: string;
  onCurrencyChange: (currencyCode: string) => void;
  onAmountChange: (amount: string) => void;
  backgroundColor?: string;
}

export default function CurrencyInput({
  supportedCurrencies,
  selectedCurrencyCode,
  amount,
  balance,
  onCurrencyChange,
  onAmountChange,
  backgroundColor = "bg-white/20",
}: CurrencyInputProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const currencies = allCurrencies.filter((c) =>
    supportedCurrencies.includes(c.code)
  );
  const selectedCurrency =
    currencies.find((c) => c.code === selectedCurrencyCode) || currencies[0];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(".")) {
      onAmountChange(value);
    } else {
      const cleanValue = value.replace(/^0+/, "") || "0";
      onAmountChange(cleanValue);
    }
  };

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency.code);
    onAmountChange("0");
  };

  return (
    <>
      <ContentCard backgroundColor={backgroundColor}>
        <div className="flex flex-col gap-[4px]">
          <div className="flex flex-row items-center gap-[12px] justify-between">
            <div className="flex items-center gap-[8px]">
              <img
                src={selectedCurrency.logo}
                alt={selectedCurrency.code}
                className="w-[32px] h-[32px]"
              />

              <button
                onClick={() => setIsSheetOpen(true)}
                className="flex items-center justify-center"
              >
                <div className="flex flex-row items-center gap-[4px]">
                  <p className="text-white text-[16px] font-medium">
                    {selectedCurrency.code}
                  </p>
                  {selectedCurrency.isComingSoon && (
                    <p className="text-white/30 text-[16px] font-pretendard">
                      출시예정
                    </p>
                  )}
                  <ChevronDownIcon />
                </div>
              </button>
            </div>
            <div className="flex flex-row items-center gap-[8px]">
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="bg-transparent text-[20px] font-bold font-pretendard text-white/90 leading-[20.736px] tracking-[-0.4px] not-italic outline-none border-none w-[80px] text-right"
                placeholder="0"
                inputMode="decimal"
              />
              <p className="text-white/50 font-pretendard text-[20px] font-medium leading-[22px] tracking-[-0.1px] not-italic">
                {selectedCurrency.code}
              </p>
            </div>
          </div>
          <p className="text-[11px] text-white/50 font-pretendard font-normal leading-[22px] tracking-[-0.1px]">
            잔액: {balance} {selectedCurrency.code}
          </p>
        </div>
      </ContentCard>

      {/* 통화 선택 시트 */}
      <CurrencySelector
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onCurrencySelect={handleCurrencySelect}
        supportedCurrencies={supportedCurrencies}
      />
    </>
  );
}
