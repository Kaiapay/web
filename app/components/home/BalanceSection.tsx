interface BalanceSectionProps {
  balance: string;
  interest: string;
  onInterestClick: () => void;
}

export default function BalanceSection({ balance, interest, onInterestClick }: BalanceSectionProps) {
  return (
    <div className="text-center pt-[72px] pb-[48px] px-2 font-pretendard">
      <p className="text-[#FCFAFF] text-[16px] leading-[1.19] tracking-[-0.056em]">
        기본 페이머니 · 쌓인 이자 {interest}
      </p>
      <h1 className="text-white font-semibold leading-[1.4] tracking-[-0.019em] h-[72px]">
        <span className="text-[48px]">{balance.split('.')[0]}</span>
        <span className="text-[24px]">.{balance.split('.')[1]} USDT</span>
      </h1>
      <button 
        onClick={onInterestClick}
        className="h-[40px] bg-white/20 backdrop-blur-[14px] rounded-[32px] px-[16px] text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity"
      >
        이자 받기
      </button>
    </div>
  );
}
