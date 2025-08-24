import { useNavigate, useParams } from "react-router-dom";
import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import CurrencyInput from "~/components/fill/CurrencyInput";
import { useState } from "react";

export default function SendAmount() {
  const { via } = useParams();
  const navigate = useNavigate();
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USDT");
  const [amount, setAmount] = useState("0");

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrencyCode(currencyCode);
  };

  const handleAmountChange = (amount: string) => {
    setAmount(amount);
  };

  return (
    <div
      className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/gradient-bg.png')",
      }}
    >
      <HeaderWithBackButton
        heading="얼마를 보낼까요?"
        subheading="보낼 토큰과 금액을 입력해주세요"
      />
      <div className="pt-[36px] px-[16px]">
        <CurrencyInput
          supportedCurrencies={["KRW", "USDT", "KAIA"]}
          selectedCurrencyCode={selectedCurrencyCode}
          amount={amount}
          balance="0"
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
      </div>
      <div className="flex flex-col gap-4 px-4 py-7">
        <Button>다음</Button>
      </div>
    </div>
  );
}
