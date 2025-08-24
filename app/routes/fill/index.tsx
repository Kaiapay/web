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
import { KAIA_RPC_URL } from "../../lib/constants";

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

const USDT_ADDRESS = "0xd077a400968890eacc75cdc901f0356c943e4fdb";
const CONTRACT_ADDRESS = "0x60f76BAdA29a44143Ee50460284028880d4aB736";

export default function Fill() {
  const [amount, setAmount] = useState("0");
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("USDT");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [wallets, setWallets] = useState<string[]>([]);
  const [usdtBalance, setUsdtBalance] = useState("0");
  const [kaiaBalance, setKaiaBalance] = useState("0");
  const [, forceRerender] = useState(0);

  useEffect(() => {
    if (wallets.length === 0) return;
    const selectedWallet = wallets[0];

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
      const wei = await viemClient.getBalance({
        address: selectedWallet as `0x${string}`,
      });

      setUsdtBalance(formatUnits(balance, decimals));
      setKaiaBalance(formatUnits(wei, 18));
    };
    getBalance();
  }, [wallets[0]]);

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

  const handleSubmit = async () => {
    if (selectedCurrencyCode !== "USDT") {
      console.error("Only USDT deposits are supported");
      return;
    }

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
        account: wallets[0] as `0x${string}`,
        address: USDT_ADDRESS,
        abi: erc20Abi,
        functionName: "approve",
        args: [CONTRACT_ADDRESS as `0x${string}`, parsedAmount],
      });

      console.log("Approve hash:", approveHash);

      // Wait for approve transaction to be mined
      await viemClient.waitForTransactionReceipt({ hash: approveHash });

      // Then deposit tokens
      const hash = await walletClient.writeContract({
        account: wallets[0] as `0x${string}`,
        address: CONTRACT_ADDRESS,
        abi: depositTokenAbi,
        functionName: "depositToken",
        args: [
          wallets[0] as `0x${string}`,
          USDT_ADDRESS as `0x${string}`,
          parsedAmount,
        ],
      });

      console.log("Transaction hash:", hash);
      await postDeposit({ txHash: hash });
    } catch (error) {
      console.error("Transaction failed:", error);
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
          balance={selectedCurrencyCode === "USDT" ? usdtBalance : kaiaBalance}
          onCurrencyChange={handleCurrencyChange}
          onAmountChange={handleAmountChange}
        />
        <Button
          onClick={handleSubmit}
          disabled={
            selectedCurrencyCode === "USDT"
              ? Number(amount) > Number(usdtBalance)
              : Number(amount) > Number(kaiaBalance) || Number(amount) === 0
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
    </div>
  );
}
