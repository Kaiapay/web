import { useEffect, useState } from "react";
import HeaderWithBackButton from "../../components/HeaderWithBackButton";
import ContentCard from "../../components/ContentCard";
import WalletConnectSheet from "../../components/fill/WalletConnectSheet";
import CurrencyInput from "../../components/fill/CurrencyInput";
import {
  createPublicClient,
  createWalletClient,
  formatUnits,
  http,
  custom,
  parseUnits,
} from "viem";
import { kaia } from "viem/chains";
import Button from "~/components/Button";
import { postDeposit } from "~/generated/api";
import {
  KAIA_RPC_URL,
  KAIAPAY_VAULT_ADDRESS,
  USDT_ADDRESS,
} from "../../lib/constants";
import { usePrivy } from "@privy-io/react-auth";
import { useNavigate } from "react-router-dom";
import BottomSheet from "~/components/BottomSheet";
import CheckIcon from "~/components/icons/CheckIcon";

const viemClient = createPublicClient({
  chain: kaia,
  transport: http(KAIA_RPC_URL),
});

const erc20Abi = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "decimals",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      { name: "spender", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

const depositTokenAbi = [
  {
    type: "function",
    name: "depositToken",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "token", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export default function Fill() {
  const [amount, setAmount] = useState("0");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USDT");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [, forceRerender] = useState(0);

  useEffect(() => {
    // Register Kaia/Klaytn provider event listeners to trigger re-render on changes
    // @ts-ignore
    const provider = typeof window !== "undefined" ? window.klaytn : undefined;
    if (!provider || !provider.on) return;

    const handleAccountsChanged = (accounts: string[]) => {
      // @ts-ignore
      setSelectedWallet(window.klaytn.selectedAddress);
    };

    provider.on("accountsChanged", handleAccountsChanged);

    return () => {
      // Clean up listeners on unmount
      if (provider.removeListener) {
        provider.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  useEffect(() => {
    // @ts-ignore
    setSelectedWallet(window.klaytn.selectedAddress);
    const getBalance = async () => {
      const balance = await viemClient.readContract({
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [selectedWallet as `0x${string}`],
      });
      const decimals = await viemClient.readContract({
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: "decimals",
      });
      setUsdtBalance(formatUnits(balance, decimals));
    };
    getBalance();
  }, [selectedWallet]);

  const handleAmountChange = (amount: string) => {
    setAmount(amount);
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrencyCode(currencyCode);
  };

  const handleErrorSheetClose = () => {
    setIsBottomSheetOpen(false);
    navigate("/home", { replace: true });
  };

  const handleErrorSheetButtonClick = () => {
    setIsBottomSheetOpen(false);
    navigate("/home", { replace: true });
  };

  const { user } = usePrivy();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const walletClient = createWalletClient({
        chain: kaia,
        // @ts-ignore
        transport: custom(window.klaytn),
      });

      const decimals = await viemClient.readContract({
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: "decimals",
      });

      const parsedAmount = parseUnits(amount, decimals);

      // First approve USDT spending
      const approveHash = await walletClient.writeContract({
        account: selectedWallet as `0x${string}`,
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: "approve",
        args: [KAIAPAY_VAULT_ADDRESS as `0x${string}`, parsedAmount],
      });

      // Wait for approve transaction to be mined
      await viemClient.waitForTransactionReceipt({ hash: approveHash });

      const smartWallet = user?.linkedAccounts.find(
        (account) => account.type === "smart_wallet"
      );

      // Then deposit tokens
      const hash = await walletClient.writeContract({
        account: selectedWallet as `0x${string}`,
        address: KAIAPAY_VAULT_ADDRESS,
        abi: depositTokenAbi,
        functionName: "depositToken",
        args: [
          smartWallet?.address as `0x${string}`,
          USDT_ADDRESS as `0x${string}`,
          parsedAmount,
        ],
      });

      await postDeposit({ txHash: hash });
      setIsBottomSheetOpen(true);
    } catch (error) {
      // TODO: 에러 처리
    }
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
              {selectedWallet ? (
                <p>
                  {selectedWallet.slice(0, 6) +
                    "..." +
                    selectedWallet.slice(-6)}
                </p>
              ) : (
                <p>Kaia Wallet</p>
              )}
            </div>
            {!selectedWallet && (
              <button
                onClick={() => navigate("/wallet-connect")}
                className="h-[40px] bg-white/20 rounded-[32px] px-[16px] text-white/90 text-[15px] font-medium hover:opacity-80 transition-opacity"
              >
                연동하기
              </button>
            )}
          </div>
        </ContentCard>

        <div className="absolute top-[160px] left-[50%] translate-x-[-50%] flex justify-center items-center my-[8px] z-50">
          <div className="w-[30px] h-[30px] rounded-full bg-black flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
            >
              <path
                d="M5 1V12.3332M5 12.3332L9 8.33317M5 12.3332L1 8.33317"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <CurrencyInput
          supportedCurrencies={["KRW", "USDT", "KAIA"]}
          selectedCurrencyCode={selectedCurrencyCode}
          amount={amount}
          balance={usdtBalance ?? "-"}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
        <Button
          onClick={handleSubmit}
          disabled={
            !selectedWallet ||
            Number(amount) > Number(usdtBalance ?? 0) ||
            Number(amount) <= 0
          }
          className="mt-2"
        >
          채우기
        </Button>
      </div>

      {/* 지갑 연동 시트 */}
      <WalletConnectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleErrorSheetClose}
        icon={<CheckIcon />}
        title="돈 채우기 완료!"
        buttonText="확인"
        onButtonClick={handleErrorSheetButtonClick}
      >
        {amount} {selectedCurrencyCode} 채우기 완료!
      </BottomSheet>
    </div>
  );
}
