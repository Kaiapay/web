import { useNavigate } from "react-router-dom";
import AttachedSheet from "../AttachedSheet";

interface WalletConnectSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletConnectSheet({
  isOpen,
  onClose,
}: WalletConnectSheetProps) {
  const navigate = useNavigate();
  const wallets = ["0x3f…9c2d", "0x2e…8d9c"];

  const handleAddWalletClick = () => {
    navigate("/wallet-connect", { viewTransition: true });
  };

  return (
    <AttachedSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-[24px] pb-[8px]">
        {/* 지갑 목록 */}
        <div className="flex flex-col gap-[24px] w-full pt-[24px]">
          {wallets.map((wallet) => (
            <div
              key={wallet}
              className="flex items-center gap-[16px] w-full h-[44px]"
            >
              <img
                src="/kaia-wallet.png"
                alt="Kaia Wallet"
                className="w-[40px] h-[40px]"
              />
              <span className="text-white text-[16px] font-normal font-pretendard leading-[1.375em] tracking-[-0.625%]">
                {wallet}
              </span>
            </div>
          ))}
        </div>

        {/* 지갑 추가 */}
        <button
          onClick={handleAddWalletClick}
          className="flex items-center gap-[16px] w-full font-pretendard hover:opacity-80 transition-opacity"
        >
          <div className="w-[40px] h-[40px] bg-white/20 backdrop-blur-[14px] rounded-[12px] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5V19M5 12H19"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <h4 className="text-white text-[16px] font-medium font-pretendard leading-[1.375em] tracking-[-0.625%]">
              지갑 추가
            </h4>
            <p className="text-white/50 text-[14px] font-pretendard leading-[1.571em] tracking-[-0.714%]">
              새로운 Kaia Wallet 연동
            </p>
          </div>
        </button>
      </div>
    </AttachedSheet>
  );
}
