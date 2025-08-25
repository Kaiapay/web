import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import BottomSheet from "~/components/BottomSheet";
import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import InputResetIcon from "~/components/icons/InputResetIcon";
import SendIcon from "~/components/icons/SendIcon";
import {
  PostTransferWithLinkBodyMethod,
  usePostTransferWithLink,
} from "~/generated/api";
import { useCustomPrivy } from "~/hooks/use-custom-privy";
import useKaiaPayTransfer from "~/hooks/useKaiaPayTransfer";

interface IFormInput {
  phoneNumber: string;
}

export default function SendViaPhone() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const { isPending, mutateAsync } = usePostTransferWithLink();
  const {
    transferToken,
    isLoading: isTransferLoading,
    error: transferError,
  } = useKaiaPayTransfer();

  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const { user } = useCustomPrivy();

  const navigate = useNavigate();
  const [isLinkSheetOpen, setIsLinkSheetOpen] = useState(false);

  const isLoading = isPending || isTransferLoading;

  const onSubmit: SubmitHandler<IFormInput> = async (submitData) => {
    const phoneNumberRegex = /^01([0|1|6|7|8|9])([0-9]{7,8})$/;
    if (!phoneNumberRegex.test(submitData.phoneNumber)) {
      setError("phoneNumber", {
        type: "manual",
        message: "올바른 핸드폰 번호가 아닙니다.",
      });
      return;
    }

    const data = await mutateAsync({
      data: {
        amount: `${amount}`,
        token: "USDT",
        method: PostTransferWithLinkBodyMethod.phone,
        phone: submitData.phoneNumber,
      },
    });

    const { publicAddress, link, transactionId } = data;

    try {
      await transferToken({
        transactionId,
        toAddress: publicAddress,
        amount: `${amount}`,
        onSuccess: () => {
          const message = `[KaiaPay] @${user?.id.slice(
            -8
          )}님이 10 USDT를 보냈어요. 아래 링크에서 ‘받기’를 눌러야 송금이 완료돼요. ${link}`;
          const smsUrl = `sms:${
            submitData.phoneNumber
          }&body=${encodeURIComponent(message)}`;
          window.location.href = smsUrl;
        },
      });
      setIsLinkSheetOpen(true);
    } catch (error) {
      alert(`트랜잭션에 실패했습니다. ${transferError}`);
    }
  };

  return (
    <form>
      <div
        className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/gradient-bg.png')",
        }}
      >
        <HeaderWithBackButton
          heading="핸드폰 번호"
          subheading="받는 사람의 핸드폰 번호를 입력해주세요"
        />
        <div className="h-8" />
        <div className="flex flex-row gap-2 px-4 py-3 pb-[14px] bg-white/10 rounded-[16px] mx-4">
          <div className="flex-col items-center flex-1">
            <div className="font-normal text-[12px] leading-[14px] tracking-[-0.1px] text-white/50 pb-1">
              핸드폰 번호
            </div>
            <input
              type="text"
              className="bg-transparent outline-none text-white font-normal text-[16px] leading-[22px] tracking-[-0.1px]"
              placeholder="01012345678"
              inputMode="numeric"
              pattern="[0-9]*"
              {...register("phoneNumber", {
                onChange: (e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setValue("phoneNumber", value, { shouldValidate: true });
                },
              })}
            />
          </div>
          <div
            className="flex items-center justify-center"
            onClick={() => {
              reset();
              setTimeout(() => setFocus("phoneNumber"), 0);
            }}
          >
            <InputResetIcon />
          </div>
        </div>
        <div
          className="font-normal text-[12px] leading-[14px] tracking-[-0.1px] text-white/50 pb-1 mx-8"
          style={{
            color: errors.phoneNumber ? "#FF443D" : "rgba(255, 255, 255, 0.5)",
          }}
        >
          {errors.phoneNumber
            ? errors.phoneNumber.message
            : "- 없이 입력하세요"}
        </div>
        <div className="flex flex-col gap-4 px-4 py-7">
          <Button isLoading={isLoading} onClick={handleSubmit(onSubmit)}>
            완료
          </Button>
        </div>
      </div>
      <BottomSheet
        isOpen={isLinkSheetOpen}
        onClose={() => setIsLinkSheetOpen(false)}
        icon={<SendIcon />}
        title="링크 생성 완료"
        buttonText="확인"
        onButtonClick={() => navigate("/home", { replace: true })}
      >
        <div className="text-center space-y-2">
          송금 받는 사람에게만 메시지를 공유해 주세요
          <br />
          다른 사람이 링크를 열지 않도록 주의하세요
        </div>
      </BottomSheet>
    </form>
  );
}
