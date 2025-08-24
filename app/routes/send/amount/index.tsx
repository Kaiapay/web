import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import CurrencyInput from "~/components/fill/CurrencyInput";
import { useState } from "react";
import BottomSheet from "~/components/BottomSheet";
import ShareIcon from "~/components/icons/ShareIcon";
import { useKaiaPayPot } from "~/hooks/useKaiaPayPot";

export default function SendAmount() {
  const [searchParams] = useSearchParams();
  const via = searchParams.get("via");
  const navigate = useNavigate();
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USDT");
  const [amount, setAmount] = useState("0");
  const [isLinkSheetOpen, setIsLinkSheetOpen] = useState(false);
  const [isLinkLoading, setIsLinkLoading] = useState(false);

  const { getFormattedBalance } = useKaiaPayPot();

  const getCurrentBalance = () => {
    if (selectedCurrencyCode === "USDT") {
      return getFormattedBalance("usdt");
    } else if (selectedCurrencyCode === "KAIA") {
      return getFormattedBalance("kaia");
    }
    return "0";
  };

  const handleShareLink = async () => {};

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrencyCode(currencyCode);
  };

  const handleAmountValidation = (newAmount: string) => {
    const currentBalance = parseFloat(getCurrentBalance());
    const inputAmount = parseFloat(newAmount);

    if (inputAmount > currentBalance) {
      setAmount(currentBalance.toString());
    } else {
      setAmount(newAmount);
    }
  };

  const canProceed = () => {
    const currentBalance = parseFloat(getCurrentBalance());
    const inputAmount = parseFloat(amount);

    return inputAmount > 0 && inputAmount <= currentBalance;
  };

  const handleNext = () => {
    if (via === "link") {
      setIsLinkLoading(true);
      setTimeout(() => {
        setIsLinkLoading(false);
        setIsLinkSheetOpen(true);
      }, 1000);
      return;
    }

    const routeMap = {
      phone: "/send/via-phone",
      "kaiapay-id": "/send/via-kaiapay-id",
      "wallet-address": "/send/via-wallet-address",
    };

    const targetRoute = routeMap[via as keyof typeof routeMap] || "/send";
    const params = new URLSearchParams({
      amount,
      currency: selectedCurrencyCode,
    });

    navigate(`${targetRoute}?${params.toString()}`);
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
          balance={getCurrentBalance()}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountValidation}
        />
      </div>

      <div className="flex flex-col gap-4 px-4 py-7">
        <Button
          onClick={handleNext}
          isLoading={isLinkLoading}
          disabled={isLinkLoading || !canProceed()}
        >
          다음
        </Button>
      </div>

      <BottomSheet
        isOpen={isLinkSheetOpen}
        onClose={() => setIsLinkSheetOpen(false)}
        icon={<ShareIcon />}
        title="링크 생성 완료"
        buttonText="공유하기"
        onButtonClick={handleShareLink}
      >
        <div className="text-center space-y-2">
          아래 버튼을 눌러 링크를 받는 사람에게만 공유해 주세요
          <br />
          다른 사람이 링크를 열지 않도록 주의하세요
        </div>
      </BottomSheet>
    </div>
  );
}
