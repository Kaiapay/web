import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";
import InputResetIcon from "~/components/icons/InputResetIcon";
import CheckSmallIcon from "~/components/icons/CheckSmallIcon";
import XCircleIcon from "~/components/icons/XCircleIcon";
import Button from "~/components/Button";
import { usePutUpdateKaiapayId } from "~/generated/api";
import { useUser } from "~/stores/userStore";

export default function ChangeIdPage() {
  const navigate = useNavigate();
  const { user, refetchUser } = useUser();
  const [id, setId] = useState(user?.kaiapayId ? `@${user.kaiapayId}` : "");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const updateKaiapayIdMutation = usePutUpdateKaiapayId({
    mutation: {
      onSuccess: (data) => {
        // FIXME: 실제 서버 응답이 PutUpdateKaiapayId200와 다르게 나오고 있어 임시 any 캐스팅
        const response = data as any;
        if (response.success && response.result) {
          refetchUser();
          navigate(-1);
        } else if (response.success === false && response.error) {
          setErrorMessage(response.error || "아이디 변경에 실패했습니다.");
        } else {
          setErrorMessage("아이디 변경에 실패했습니다.");
        }
      },
      onError: () => {
        setErrorMessage("아이디 변경 중 오류가 발생했습니다.");
      },
    },
  });

  const handleIdChange = (value: string) => {
    const newId = value.startsWith("@") ? value : `@${value}`;
    setId(newId);

    // 유효성 검사
    const regex = /^@[a-zA-Z0-9가-힣]{4,16}$/;
    if (newId.length < 5) {
      setIsValid(false);
      setErrorMessage("");
    } else if (!regex.test(newId)) {
      setIsValid(false);
      setErrorMessage("올바른 KaiaPay 아이디가 아닙니다.");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  };

  const handleReset = () => {
    setId("@");
    setIsValid(true);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (isValid && id.length >= 5) {
      const kaiapayId = id.replace("@", "");
      updateKaiapayIdMutation.mutate({
        data: {
          kaiapayId: kaiapayId,
        },
      });
    }
  };

  const isSubmitDisabled = !isValid || id.length < 5 || updateKaiapayIdMutation.isPending;

  return (
    <div
      className="flex flex-col h-screen gap-2 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "url('/gradient-bg.png')",
      }}
    >
      <HeaderWithBackButton
        heading="아이디"
        subheading="KaiaPay에서 사용할 아이디를 입력해주세요"
      />
      <div className="h-8" />

      <div className="flex flex-row gap-2 px-4 py-3 pb-[14px] bg-white/10 rounded-[16px] mx-4">
        <div className="flex-col items-center flex-1">
          <div className="font-normal text-[12px] leading-[14px] tracking-[-0.1px] text-white/50 pb-1">
            아이디
          </div>
          <div className="flex flex-row items-center">
            <div className="font-normal text-[16px] leading-[22px] tracking-[-0.1px] text-white pb-1">
              @
            </div>
            <input
              type="text"
              className="bg-transparent outline-none text-white font-normal text-[16px] leading-[22px] tracking-[-0.1px]"
              placeholder="아이디"
              value={id.replace("@", "")}
              onChange={(e) => handleIdChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-center" onClick={handleReset}>
          <InputResetIcon />
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 pb-1 px-8">
        {errorMessage ? <XCircleIcon size={16} /> : <CheckSmallIcon />}
        <div
          className="font-normal text-[12px] leading-[14px] tracking-[-0.1px]"
          style={{
            color: errorMessage ? "#FF443D" : "rgba(255, 255, 255, 0.5)",
          }}
        >
          {errorMessage || "한글 또는 영문 4-16자"}
        </div>
        <div className="font-normal text-[12px] leading-[14px] tracking-[-0.1px] text-white/50 ml-auto">
          {id.length - 1}/16
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-7">
        <Button onClick={handleSubmit} disabled={isSubmitDisabled} isLoading={updateKaiapayIdMutation.isPending}>
          완료
        </Button>
      </div>
    </div>
  );
}
