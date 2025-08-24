import { useState } from "react";
import ContentCard from "../ContentCard";
import AttachedSheet from "../AttachedSheet";
import ChevronDownIcon from "~/components/icons/chevron-down";
import KRWLogo from "~/routes/assets/krw-logo.png";
import USDTLogo from "~/routes/assets/usdt-logo.png";
import KaiaLogo from "~/routes/assets/kaia-wallet.png";

interface Currency {
  code: string;
  name: string;
  logo: string;
  isComingSoon?: boolean;
}

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

  const allCurrencies: Currency[] = [
    {
      code: "USDT",
      name: "테더",
      logo: USDTLogo,
    },
    {
      code: "KAIA",
      name: "카이아",
      logo: KaiaLogo,
    },
    {
      code: "KRW",
      name: "원화",
      logo: KRWLogo,
      isComingSoon: true,
    },
  ];

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
    setIsSheetOpen(false);
  };

  // TODO: 각 통화별 잔액 매핑 (실제로는 주스탠다드 등 API에서 가져와야 함)
  const getCurrencyBalance = (currencyCode: string) => {
    const balances: Record<string, string> = {
      USDT: "10.43",
      KAIA: "5.00",
      KRW: "0",
    };
    return balances[currencyCode] || "0";
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
            잔액: {getCurrencyBalance(selectedCurrency.code)}{" "}
            {selectedCurrency.code}
          </p>
        </div>
      </ContentCard>

      {/* 통화 선택 시트 */}
      <AttachedSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)}>
        <div className="flex flex-col items-center gap-[24px]">
          <div className="flex flex-col gap-[12px] w-full pt-[12px]">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleCurrencySelect(currency)}
                className="flex items-center gap-[24px] w-full h-[44px] rounded-[8px] transition-colors"
              >
                <img
                  src={currency.logo}
                  alt={currency.code}
                  className="w-[40px] h-[40px]"
                />
                <div className="flex flex-col items-start flex-1">
                  <span className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                    {currency.name}
                  </span>
                  {currency.isComingSoon && (
                    <span className="text-white/30 text-[14px] font-pretendard leading-[1.571em] tracking-[-0.714%]">
                      출시예정
                    </span>
                  )}
                  {!currency.isComingSoon && (
                    <span className="text-white/30 text-[14px] font-pretendard leading-[1.571em] tracking-[-0.714%]">
                      {getCurrencyBalance(currency.code)} {currency.code}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </AttachedSheet>
    </>
  );
}
