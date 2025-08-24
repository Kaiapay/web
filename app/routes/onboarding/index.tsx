import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useCustomPrivy } from "~/hooks/use-custom-privy";

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  feature: string;
  imageUrl: string;
}

const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: "지갑 없는 사람에게도\n보내기",
    description: "링크 하나로 주고받는\nUSDT와 KRW",
    feature: "크립토 모르는 친구도\n그냥 링크 열면 USDT, KRW 받아요",
    imageUrl: "/onboarding-img1.png",
  },
  {
    id: 2,
    title: "간편 보내기",
    description: "어디로든, 누구에게나\n몇 초면 끝나는 보내기",
    feature: "계좌번호를 몰라도\n핸드폰 번호, 카카오톡, 텔레그램 어디든 보내기",
    imageUrl: "/onboarding-img2.png",
  },
  {
    id: 3,
    title: "이자 받기",
    description: "하루만 넣어놔도\n쌓이는 이자",
    feature: "가만히 둬도 불어나는 페이머니\nKRW·USDT, 자동으로 매일 이자 적립",
    imageUrl: "/onboarding-img3.png",
  },
  {
    id: 4,
    title: "출금 · 카드",
    description: "구글 · 애플페이로\n바로 꺼내 쓰기",
    feature:
      "RedotPay로 손쉽게 출금하고\n곧 출시될 KaiaPay 카드로 어디서나 결제",
    imageUrl: "/onboarding-img4.png",
  },
  {
    id: 5,
    title: "보안 · 계정",
    description: "제3자 없는\n탈중앙 페이머니",
    feature:
      "소셜 로그인으로 바로 가입해도 보안은 그대로 유지\n가입은 빠르게, 보안은 확실하게.",
    imageUrl: "/onboarding-img5.png",
  },
  {
    id: 6,
    title: "페이머니 받기",
    description: "결제받기, 돈 모으기도\n링크 하나로 끝",
    feature:
      "기본 페이머니 링크부터 맞춤 금액 링크까지.\n모임 회비든, 상품 결제든 원하는 대로 받아보세요.",
    imageUrl: "/onboarding-img6.png",
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { login, authenticated, ready } = useCustomPrivy();

  useEffect(() => {
    if (ready && authenticated) {
      navigate("/home");
    }
  }, [ready, authenticated, navigate]);

  const handleSignup = async () => {
    try {
      await login();
    } catch (error) {
      console.error(error);
    }
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const screenWidth = rect.width;
    const halfWidth = screenWidth / 2;

    if (clickX < halfWidth) {
      if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
        setProgress(0);
      }
    } else {
      if (currentSlide < onboardingSlides.length - 1) {
        setCurrentSlide(currentSlide + 1);
        setProgress(0);
      } else {
        setCurrentSlide(0);
        setProgress(0);
      }
    }
  };

  useEffect(() => {
    const duration = 3500;
    const interval = 50;
    const steps = duration / interval;
    const progressIncrement = 100 / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += progressIncrement;
      setProgress(Math.min(currentProgress, 100));

      if (currentProgress >= 100) {
        if (currentSlide < onboardingSlides.length - 1) {
          setCurrentSlide(currentSlide + 1);
          setProgress(0);
        } else {
          setCurrentSlide(0);
          setProgress(0);
        }
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentSlide, navigate]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex flex-col cursor-pointer"
      onClick={handleScreenClick}
    >
      <div className="flex-1 flex flex-col px-[8px] pb-[24px] pt-[16px]">
        <div className="flex gap-[2px] mb-[12px]">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-0.5 rounded-full transition-all duration-300 relative overflow-hidden bg-[rgba(217,217,217,0.25)]`}
            >
              {index === currentSlide && (
                <div
                  className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-50 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[12px] mb-[16px]">
          <img src="/kp.svg" alt="kp" className="w-[22px] h-auto" />
          <span className="text-white text-base font-normal leading-[1.375] tracking-[-0.02em] font-pretendard">
            {onboardingSlides[currentSlide].title}
          </span>
        </div>

        <div className="flex-1 flex flex-col px-[8px]">
          <div className="mb-[12px]">
            <h1 className="text-white text-[32px] font-bold leading-[1.375] tracking-[-0.03em] mb-[12px] whitespace-pre-line font-kakao-big-sans">
              {onboardingSlides[currentSlide].description}
            </h1>
            <p className="text-[#AEAEAE] text-base font-normal leading-[1.375] tracking-[-0.02em] whitespace-pre-line font-pretendard">
              {onboardingSlides[currentSlide].feature}
            </p>
          </div>

          <div className="flex-1 flex items-center justify-center mb-[24px]">
            <div className="w-full h-full max-w-[320px] max-h-[320px] rounded-lg overflow-hidden">
              <img
                src={onboardingSlides[currentSlide].imageUrl}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover rounded-lg select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleSignup();
            }}
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
