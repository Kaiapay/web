import AttachedSheet from "../AttachedSheet";
import { useEffect, useState } from "react";

interface WalletConnectSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WalletConnectSheet({
  isOpen,
  onClose,
}: WalletConnectSheetProps) {
  const [wallets, setWallets] = useState<string[]>([]);
  const [, forceRerender] = useState(0);

  const handleAddWalletClick = async () => {
    // @ts-ignore
    const accounts = await window.klaytn.enable();
    console.log(accounts);
  };

  useEffect(() => {
    const getWallets = async () => {
      // @ts-ignore
      const accounts = await window.klaytn.enable();
      setWallets(accounts);
    };
    getWallets();
  }, []);

  useEffect(() => {
    // @ts-ignore
    const provider = typeof window !== "undefined" ? window.klaytn : undefined;
    if (!provider || !provider.on) return;

    const handleAccountsChanged = (accounts: string[]) => {
      setWallets(accounts || []);
    };

    const handleNetworkChanged = (_networkId: unknown) => {
      forceRerender((v) => v + 1);
    };

    const handleDisconnected = () => {
      setWallets([]);
      forceRerender((v) => v + 1);
    };

    provider.on("accountsChanged", handleAccountsChanged);
    provider.on("networkChanged", handleNetworkChanged);
    provider.on("disconnected", handleDisconnected);

    return () => {
      if (provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("networkChanged", handleNetworkChanged);
        provider.removeListener("disconnected", handleDisconnected);
      }
    };
  }, []);

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
                {wallet.slice(0, 6) + "..." + wallet.slice(-6)}
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
