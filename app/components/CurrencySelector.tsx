import AttachedSheet from "./AttachedSheet";
import type { Currency } from "~/types/currency";
import { allCurrencies, getCurrencyBalance } from "~/lib/currency";
import { useBalance } from "~/contexts/BalanceContext";

interface CurrencySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onCurrencySelect: (currency: Currency) => void;
  supportedCurrencies?: string[];
}

export default function CurrencySelector({
  isOpen,
  onClose,
  onCurrencySelect,
  supportedCurrencies = ["USDT", "KAIA", "KRW"],
}: CurrencySelectorProps) {
  const balanceProvider = useBalance();
  const currencies = allCurrencies.filter((c) =>
    supportedCurrencies.includes(c.code)
  );

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencySelect(currency);
    onClose();
  };

  return (
    <AttachedSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-[24px]">
        <div className="flex flex-col gap-[12px] w-full pt-[12px]">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => {
                if (currency.isComingSoon) {
                  return;
                }
                handleCurrencySelect(currency);
              }}
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
                    {getCurrencyBalance(currency.code, balanceProvider)}{" "}
                    {currency.code}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </AttachedSheet>
  );
}
