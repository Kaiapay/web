import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import InputResetIcon from "~/components/icons/InputResetIcon";
import { useForm, type SubmitHandler } from "react-hook-form"
import { useState } from "react";

interface IFormInput {
  phoneNumber: string
}

export default function SendViaPhone() {
  const { register, handleSubmit, reset, setValue, setFocus, setError, formState: { errors } } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const phoneNumberRegex = /^01([0|1|6|7|8|9])([0-9]{7,8})$/;
    if (!phoneNumberRegex.test(data.phoneNumber)) {
      setError('phoneNumber', { type: 'manual', message: '올바른 핸드폰 번호가 아닙니다.' });
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const message = `[KaiaPay] @김카이아님이 10 USDT를 보냈어요. 아래 링크에서 ‘받기’를 눌러야 송금이 완료돼요. https://www.kaiapay.com/2HEFKKHCGIRCgWrO+fc6lYel7D4Vb3Ajjp3tMwr11T4=44톤`;
    const smsUrl = `sms:${data.phoneNumber}&body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;

    setTimeout(() => {
      console.log(data)
      setIsLoading(false);
    }, 2000);
  }

  return (
    <form>
    <div 
      className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/gradient-bg.png')",
      }}
    >
      <HeaderWithBackButton heading="핸드폰 번호" subheading="받는 사람의 핸드폰 번호를 입력해주세요" />
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
            {...register('phoneNumber', {
              onChange: (e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setValue('phoneNumber', value, { shouldValidate: true });
              },
            })}
          />
        </div>
        <div className="flex items-center justify-center" onClick={() => {
          reset();
          setTimeout(() => setFocus('phoneNumber'), 0); 
          }}>
          <InputResetIcon />
        </div>
      </div>
      <div className="font-normal text-[12px] leading-[14px] tracking-[-0.1px] text-white/50 pb-1 mx-8" style={{ color: errors.phoneNumber ? '#FF443D' : 'rgba(255, 255, 255, 0.5)' }}>
        {errors.phoneNumber ? errors.phoneNumber.message : '- 없이 입력하세요'}
      </div>
      <div className="flex flex-col gap-4 px-4 py-7">
        <Button isLoading={isLoading} onClick={handleSubmit(onSubmit)}>완료</Button>
      </div>
    </div>
    </form>
  );
}
