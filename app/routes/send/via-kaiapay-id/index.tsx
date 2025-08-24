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
import { postTransferWithKaiapayId, PostTransferWithKaiapayId200SeriesOneOf, PostTransferWithKaiapayId200SeriesOneOfResult, usePostTransferWithKaiapayId } from "~/generated/api";
import useKaiaPayTransfer from "~/hooks/useKaiaPayTransfer";

interface IFormInput {
  kaiapayId: string
}

export default function SendViaKaiapayId() {
  const { isPending, mutateAsync, isError, error } = usePostTransferWithKaiapayId();
  const {
    transferToken,
    isLoading: isTransferLoading,
    error: transferError,
  } = useKaiaPayTransfer();

  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  
  const { register, handleSubmit, reset, setValue, setFocus, setError, formState: { errors } } = useForm<IFormInput>();

  const isLoading = isPending || isTransferLoading;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const navigate = useNavigate();

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
  }

  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
    navigate('/home', { replace: true });
  }

  const onSubmit: SubmitHandler<IFormInput> = async (submitData) => {
    const regex = /^[a-zA-Z0-9가-힣]{4,16}$/;
    if (!regex.test(submitData.kaiapayId)) {
      setError('kaiapayId', { type: 'manual', message: '올바른 KaiaPay 아이디가 아닙니다.' });
      return;
    }

      try {
        const result = await postTransferWithKaiapayId({
        amount: `${amount}`,
        token: "USDT",
        kaiapayId: submitData.kaiapayId,
      });

      const {publicAddress} = result as unknown as PostTransferWithKaiapayId200SeriesOneOfResult;
      try {
        await transferToken({
          toAddress: publicAddress,
          amount: `${amount}`,
          onSuccess: () => {
            setIsBottomSheetOpen(true);
          },
        });
      } catch (error) {
        alert(`트랜잭션에 실패했습니다. ${transferError}`);
      }

    } catch (error) {
      alert(`서버 호출에 실패했습니다. ${error}`);
    }


  
  }

  return (
    <>
    <form>
    <div 
      className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/gradient-bg.png')",
      }}
      >
      <HeaderWithBackButton heading="카이아페이 아이디" subheading="받는 사람의 KaiaPay 아이디를 입력해주세요" />
      <div className="h-8" />
      <div className="flex flex-row gap-2 px-4 py-3 pb-[14px] bg-white/10 rounded-[16px] mx-4">
        <div className="flex-col items-center flex-1">
          <div className="font-normal text-[12px] leading-[14px] tracking-[-0.1px] text-white/50 pb-1">
            KaiaPay 아이디
          </div>
          <div className="flex flex-row items-center">
            <div className="font-normal text-[16px] leading-[22px] tracking-[-0.1px] text-white pb-1">
              @
            </div> 
          <input 
            type="text"
            className="bg-transparent outline-none text-white font-normal text-[16px] leading-[22px] tracking-[-0.1px]"
            placeholder="kaia123"
            inputMode="text"
            {...register('kaiapayId')}
            />
          </div>
        </div>
        <div className="flex items-center justify-center" onClick={() => {
          reset();
          setTimeout(() => setFocus('kaiapayId'), 0); 
        }}>
          <InputResetIcon />
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 pb-1 px-8">
        {errors.kaiapayId ? <XCircleIcon size={16} /> : <CheckSmallIcon />}
        <div className="font-normal text-[12px] leading-[14px] tracking-[-0.1px]" style={{ color: errors.kaiapayId ? '#FF443D' : 'rgba(255, 255, 255, 0.5)' }}>
          {errors.kaiapayId ? errors.kaiapayId.message : '한글, 영문, 숫자 4-16자'}
        </div>
      </div>
      <div className="flex flex-col gap-4 px-4 py-7">
        <Button isLoading={isLoading} onClick={handleSubmit(onSubmit)}>완료</Button>
      </div>
    </div>
    </form>
    <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={handleErrorSheetClose}
          icon={
            <CheckIcon />
          }
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
