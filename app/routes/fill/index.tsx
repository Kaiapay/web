import { useEffect, useState } from "react";
import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import ContentCard from "../../components/ContentCard";
import WalletConnectSheet from "../../components/fill/WalletConnectSheet";
import CurrencyInput from "../../components/fill/CurrencyInput";

export default function Fill() {
  const [amount, setAmount] = useState("0");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USDT");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [wallets, setWallets] = useState<string[]>([]);
  const [, forceRerender] = useState(0);

  useEffect(() => {
    const getWallets = async () => {
      // @ts-ignore
      const accounts = await window.klaytn.enable();
      setWallets(accounts);
    };
    getWallets();
  }, []);

  useEffect(() => {
    // Register Kaia/Klaytn provider event listeners to trigger re-render on changes
    // @ts-ignore
    const provider = typeof window !== "undefined" ? window.klaytn : undefined;
    if (!provider || !provider.on) return;

    const handleAccountsChanged = (accounts: string[]) => {
      setWallets(accounts || []);
    };

    const handleNetworkChanged = (_networkId: unknown) => {
      // Incrementing a version forces a re-render even if accounts didn't change
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
      // Clean up listeners on unmount
      if (provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
        provider.removeListener("networkChanged", handleNetworkChanged);
        provider.removeListener("disconnected", handleDisconnected);
      }
    };
  }, []);

  const handleAmountChange = (amount: string) => {
    setAmount(amount);
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrencyCode(currencyCode);
  };

  const handleOpenSheet = () => {
    setIsSheetOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#040404] flex flex-col">
      {/* 헤더 */}
      <HeaderWithBackButton heading="채우기" />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col px-[16px] pt-[20px] pb-[12px] gap-[8px]">
        <ContentCard>
          <div className="flex flex-row items-center gap-[12px] justify-between min-h-[52px]">
            <div className="flex flex-row items-center gap-[12px]">
              <img
                src="/kaia-wallet.png"
                alt="Kaia Wallet"
                className="w-[32px] h-[32px]"
              />
              {wallets.length > 0 ? (
                <p>{wallets[0].slice(0, 6) + "..." + wallets[0].slice(-6)}</p>
              ) : (
                <p>Kaia Wallet</p>
              )}
            </div>
            {wallets.length === 0 && (
              <button
                onClick={handleOpenSheet}
                className="h-[40px] bg-white/20 rounded-[32px] px-[16px] text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity"
              >
                연동하기
              </button>
            )}
          </div>
        </ContentCard>

        <div className="absolute top-[149px] left-[50%] translate-x-[-50%] flex justify-center items-center my-[8px] z-50">
          <div className="w-[30px] h-[30px] rounded-full bg-black flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14" fill="none">
              <path d="M5 1V12.3332M5 12.3332L9 8.33317M5 12.3332L1 8.33317" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <CurrencyInput
          supportedCurrencies={["KRW", "USDT", "KAIA"]}
          selectedCurrencyCode={selectedCurrencyCode}
          amount={amount}
          balance="0"
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
      </div>

      {/* 지갑 연동 시트 */}
      <WalletConnectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}
