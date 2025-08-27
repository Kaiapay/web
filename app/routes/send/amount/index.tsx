import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { parseUnits } from "viem";
import Alert from "~/components/Alert";
import BottomSheet from "~/components/BottomSheet";
import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import CurrencyInput from "~/components/fill/CurrencyInput";
import ShareIcon from "~/components/icons/ShareIcon";
import CheckIcon from "~/components/icons/CheckIcon";
import {
  PostTransferWithLink200,
  PostTransferWithLinkBodyMethod,
  usePostTransferWithLink,
} from "~/generated/api";
import { useKaiaPayPot } from "~/hooks/useKaiaPayPot";
import useKaiaPayTransfer from "~/hooks/useKaiaPayTransfer";
import { USDT_ADDRESS } from "~/lib/constants";

export default function SendAmount() {
  const [searchParams] = useSearchParams();
  const via = searchParams.get("via");
  const navigate = useNavigate();
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USDT");
  const [amount, setAmount] = useState("0");
  const [isLinkSheetOpen, setIsLinkSheetOpen] = useState(false);
  const [showCheckAnimation, setShowCheckAnimation] = useState(false);

  const { isPending, data: linkData, mutateAsync } = usePostTransferWithLink();
  const {
    transferToken,
    isLoading: isTransferLoading,
    error: transferError,
  } = useKaiaPayTransfer();

  const isLinkLoading = {
    link: isPending || isTransferLoading,
    phone: false,
    "kaiapay-id": false,
    "wallet-address": false,
  };

  const { getFormattedBalance } = useKaiaPayPot();

  const getCurrentBalance = () => {
    if (selectedCurrencyCode === "USDT") {
      return getFormattedBalance("usdt");
    } else if (selectedCurrencyCode === "KAIA") {
      return getFormattedBalance("kaia");
    }
    return "0";
  };

  const handleShareLink = async () => {
    const { link } = linkData as PostTransferWithLink200;

    try {
      if (!link) {
        alert("링크가 생성되지 않았습니다. 다시 시도해주세요.");
        return;
      }

      // if (navigator.share) {
      //   await navigator.share({
      //     title: "KaiaPay 송금 링크",
      //     text: `${amount} ${selectedCurrencyCode} 받기`,
      //     url: link,
      //   });
      // }

      await navigator.clipboard.writeText(link);
      setShowCheckAnimation(true);
    } catch (error) {
      alert("링크 공유에 실패했습니다. 다시 시도해주세요.");
    }
  };

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

  console.log(amount);
  const handleNext = async () => {
    if (via === "link") {
      const data = await mutateAsync({
        data: {
          amount: parseUnits(amount, 6).toString(),
          token: USDT_ADDRESS,
          method: PostTransferWithLinkBodyMethod.link,
        },
      });

      const { publicAddress, transactionId } = data;

      try {
        await transferToken({
          transactionId,
          toAddress: publicAddress,
          amount: `${amount}`,
          onSuccess: () => {
            setIsLinkSheetOpen(true);
          },
          isTemporaryWallet: true,
        });
      } catch (error) {
        alert(`트랜잭션에 실패했습니다. ${transferError}`);
      }

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
          isLoading={isLinkLoading[via as keyof typeof isLinkLoading]}
          disabled={
            isLinkLoading[via as keyof typeof isLinkLoading] || !canProceed()
          }
        >
          {via === "link" ? "보내기" : "다음"}
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

      <Alert
        isOpen={showCheckAnimation}
        onClose={() => setShowCheckAnimation(false)}
        icon={<CheckIcon size={28} color="#10B981" />}
        title="복사 완료"
        buttonText="확인"
        onButtonClick={() => navigate("/home", { replace: true })}
      >
        링크가 클립보드에 복사되었습니다
      </Alert>
    </div>
  );
}
