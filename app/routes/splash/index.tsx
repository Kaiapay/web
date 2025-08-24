import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 2초 후 메인 페이지로 이동
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        navigate("/onboarding");
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex-1 flex items-center justify-center">
        <img src="/kaiapay-logo.svg" alt="Kaiapay" className="w-[142px] h-auto" />
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
