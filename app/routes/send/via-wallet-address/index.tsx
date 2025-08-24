import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomSheet from "~/components/BottomSheet";
import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import CheckIcon from "~/components/icons/CheckIcon";
import CheckSmallIcon from "~/components/icons/CheckSmallIcon";
import InputResetIcon from "~/components/icons/InputResetIcon";
import XCircleIcon from "~/components/icons/XCircleIcon";
import { usePostTransferWithExternalAddress } from "~/generated/api";
import useKaiaPayWithdraw from "~/hooks/useKaiaPayWithdraw";

interface IFormInput {
  walletAddress: string;
}

export default function SendViaWalletAddress() {
  const {mutateAsync, isPending } = usePostTransferWithExternalAddress();
  const {
    transferToken,
    isLoading: isTransferLoading,
    error: transferError,
  } = useKaiaPayWithdraw();
  
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  // const [isLoading, setIsLoading] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();
  const isLoading = isPending || isTransferLoading;
  

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  };

  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
    navigate("/home");
  };

  const onSubmit: SubmitHandler<IFormInput> = async (submitData) => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    if (!regex.test(submitData.walletAddress)) {
      setError("walletAddress", {
        type: "manual",
        message: "올바른 지갑 주소가 아닙니다.",
      });
      return;
    }

    await mutateAsync({data: {
      amount: `${amount}`,
      token: "USDT",
      address: submitData.walletAddress,
    }});


    try {
      await transferToken({
        toAddress: submitData.walletAddress,
        amount: `${amount}`,
        onSuccess: () => {
          setIsBottomSheetOpen(true);
        },
      });
    } catch (error) {
      alert(`트랜잭션에 실패했습니다. ${transferError}`);
    }
  };

  return (
    <>
      <form>
        <div
          className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: "url('/gradient-bg.png')",
          }}
        >
          <HeaderWithBackButton
            heading="지갑 주소"
            subheading="받는 사람의 지갑 주소를 입력해주세요"
          />
          <div className="h-8" />
          <div className="flex flex-row gap-2 px-4 py-3 pb-[14px] bg-white/10 rounded-[16px] mx-4">
            <div className="flex-col items-center flex-1">
              <div className="font-normal text-[12px] leading-[14px] tracking-[-0.1px] text-white/50 pb-1">
                지갑 주소
              </div>

              <input
                type="text"
                className="bg-transparent outline-none text-white font-normal text-[16px] leading-[22px] tracking-[-0.1px]"
                placeholder="0x1234...abcd"
                inputMode="text"
                {...register("walletAddress")}
              />
            </div>
            <div
              className="flex items-center justify-center"
              onClick={() => {
                reset();
                setTimeout(() => setFocus("walletAddress"), 0);
              }}
            >
              <InputResetIcon />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 pb-1 px-8">
            {errors.walletAddress ? (
              <XCircleIcon size={16} />
            ) : (
              <CheckSmallIcon />
            )}
            <div
              className="font-normal text-[12px] leading-[14px] tracking-[-0.1px]"
              style={{
                color: errors.walletAddress
                  ? "#FF443D"
                  : "rgba(255, 255, 255, 0.5)",
              }}
            >
              {errors.walletAddress
                ? errors.walletAddress.message
                : "카이아 네트워크로만 보낼 수 있어요"}
            </div>
          </div>
          <div className="flex flex-col gap-4 px-4 py-7">
            <Button isLoading={isLoading} onClick={handleSubmit(onSubmit)}>
              완료
            </Button>
          </div>
        </div>
      </form>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={<CheckIcon />}
        title="돈 보내기 완료"
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        거래 세부 내역과 트랜잭션 주소는
        <br />
        거래 내역 상세에서 확인하실 수 있어요
      </BottomSheet>
    </>
  );
}
