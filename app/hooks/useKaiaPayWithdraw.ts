import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { encodeFunctionData } from "viem";
import { KAIAPAY_VAULT_ADDRESS, USDT_ADDRESS } from "../lib/constants";
import { postConfirmTransfer, postConfirmWithdraw } from "~/generated/api";

// KaiaPayVault ABI for transferToken function
const KAIAPAY_VAULT_ABI = [
  {
    type: "function",
    name: "withdrawToken",
    inputs: [
      { name: "to", type: "address", internalType: "address" },
      { name: "token", type: "address", internalType: "address" },
      { name: "amount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;

export interface TransferParams {
  transactionId: string;
  toAddress: string;
  amount: string; // In USDT (e.g., "1.5")
  onSuccess?: () => void; // Optional callback to refresh balances or other actions
}

export interface TransferResult {
  txHash: string;
  explorerUrl: string;
}

export function useKaiaPayWithdraw() {
  const { user, ready, authenticated } = usePrivy();
  const { client } = useSmartWallets();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // smart wallet address
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === "smart_wallet"
  );

  const transferToken = async ({
    transactionId,
    toAddress,
    amount,
    onSuccess,
  }: TransferParams): Promise<TransferResult> => {
    if (!ready || !authenticated || !user) {
      throw new Error("User not authenticated");
    }

    if (!smartWallet) {
      throw new Error("No smart wallet found");
    }

    if (!client) {
      throw new Error("Smart wallet client not available");
    }

    if (!toAddress || !amount) {
      throw new Error("Missing required parameters");
    }

    setIsLoading(true);
    setError("");

    try {
      // Convert amount to wei (USDT has 6 decimals)
      const amountWei = BigInt(parseFloat(amount) * 1000000);

      // Encode the function call
      const data = encodeFunctionData({
        abi: KAIAPAY_VAULT_ABI,
        functionName: "withdrawToken",
        args: [
          toAddress as `0x${string}`,
          USDT_ADDRESS as `0x${string}`,
          amountWei,
        ],
      });

      // Send the transaction using smart wallet
      const hash = await client.sendTransaction({
        to: KAIAPAY_VAULT_ADDRESS,
        data,
        value: BigInt(0), // No ETH being sent
      });

      const result: TransferResult = {
        txHash: hash,
        explorerUrl: `https://kaiachain.io/tx/${hash}`,
      };

      // Send txHash to API here
      postConfirmWithdraw({ transactionId, txHash: hash });
      // Call success callback to refresh balances
      onSuccess?.();

      return result;
    } catch (err: any) {
      const errorMessage = err.message || "Transaction failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transferToken,
    isLoading,
    error,
    smartWallet,
    isReady: ready && authenticated && !!smartWallet && !!client,
  };
}

export default useKaiaPayWithdraw;
