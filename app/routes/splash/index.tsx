import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomPrivy } from "~/hooks/use-custom-privy";

export default function Splash() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const { authenticated, ready } = useCustomPrivy();

  useEffect(() => {
    // 2초 후 로그인 상태에 따라 페이지 이동
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (ready) {
          if (authenticated) {
            navigate("/home");
          } else {
            navigate("/onboarding");
          }
        } else {
          navigate("/onboarding");
        }
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, authenticated, ready]);

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex-1 flex items-center justify-center">
        <img
          src="/kaiapay-logo.svg"
          alt="Kaiapay"
          className="w-[142px] h-auto"
        />
      </div>

      <div className="absolute bottom-[52px] left-0 right-0 flex flex-col items-center space-y-[8px]">
        <div className="text-white font-pretendard text-[14px] not-italic font-normal leading-[24px] tracking-[-0.28px]">
          Available On
        </div>
        <img src="/kaia-logo.svg" alt="Kaia" className="w-[63px] h-auto" />
      </div>
    </div>
  );
}
