import { useState, useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { createPublicClient, http, formatUnits } from "viem";
import { kaia } from "viem/chains";
import { KAIA_RPC_URL, KAIAPAY_VAULT_ADDRESS, USDT_ADDRESS, KAIA_ADDRESS } from "../lib/constants";

// KaiaPayVault ABI for getPot function
const KAIAPAY_VAULT_ABI = [
  {
    inputs: [
      { name: "user", type: "address" },
      { name: "token", type: "address" }
    ],
    name: "getPot",
    outputs: [
      { name: "balance", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "owner", type: "address" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;

// Create viem client for reading contract data
const publicClient = createPublicClient({
  chain: kaia,
  transport: http(KAIA_RPC_URL)
});

export interface PotData {
  balance: string; // Formatted balance (e.g., "1.5")
  deadline: bigint; // Unix timestamp
  owner: string; // Address
  isTemporary: boolean; // True if owner !== user
}

export interface PotBalances {
  usdt: PotData;
  kaia: PotData;
}

export function useKaiaPayPot(userAddress?: string) {
  const { user, ready, authenticated } = usePrivy();
  const [balances, setBalances] = useState<PotBalances | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Use provided address or smart wallet address
  const smartWallet = user?.linkedAccounts.find(
    (account) => account.type === "smart_wallet"
  );

  const targetAddress = userAddress || smartWallet?.address;

  const fetchPotData = async (address: string) => {
    if (!address) return;

    setIsLoading(true);
    setError("");

    try {
      // Fetch USDT pot data
      const usdtPotData = await publicClient.readContract({
        address: KAIAPAY_VAULT_ADDRESS,
        abi: KAIAPAY_VAULT_ABI,
        functionName: "getPot",
        args: [address as `0x${string}`, USDT_ADDRESS as `0x${string}`]
      });

      // Fetch KAIA pot data (using zero address for native KAIA)
      const kaiaPotData = await publicClient.readContract({
        address: KAIAPAY_VAULT_ADDRESS,
        abi: KAIAPAY_VAULT_ABI,
        functionName: "getPot",
        args: [address as `0x${string}`, KAIA_ADDRESS as `0x${string}`]
      });

      const potBalances: PotBalances = {
        usdt: {
          balance: formatUnits(usdtPotData[0], 6), // USDT has 6 decimals
          deadline: usdtPotData[1],
          owner: usdtPotData[2],
          isTemporary: usdtPotData[2].toLowerCase() !== address.toLowerCase()
        },
        kaia: {
          balance: formatUnits(kaiaPotData[0], 18), // KAIA has 18 decimals
          deadline: kaiaPotData[1],
          owner: kaiaPotData[2],
          isTemporary: kaiaPotData[2].toLowerCase() !== address.toLowerCase()
        }
      };

      setBalances(potBalances);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to fetch pot data";
      setError(errorMessage);
      console.error("Error fetching pot data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshBalances = () => {
    if (targetAddress) {
      fetchPotData(targetAddress);
    }
  };

  useEffect(() => {
    if (targetAddress) {
      fetchPotData(targetAddress);
    }
  }, [targetAddress]);

  // Helper functions for UI
  const getFormattedBalance = (token: 'usdt' | 'kaia'): string => {
    if (!balances) return "0";
    return balances[token].balance;
  };

  const isTemporaryPot = (token: 'usdt' | 'kaia'): boolean => {
    if (!balances) return false;
    return balances[token].isTemporary;
  };

  const getDeadline = (token: 'usdt' | 'kaia'): Date | null => {
    if (!balances) return null;
    const deadline = balances[token].deadline;
    if (deadline === BigInt(0)) return null; // No deadline
    return new Date(Number(deadline) * 1000);
  };

  const getOwner = (token: 'usdt' | 'kaia'): string => {
    if (!balances) return "";
    return balances[token].owner;
  };

  return {
    balances,
    isLoading,
    error,
    targetAddress,
    isReady: ready && authenticated && !!targetAddress,
    refreshBalances,
    // helper functions
    getFormattedBalance,
    isTemporaryPot,
    getDeadline,
    getOwner
  };
}

export default useKaiaPayPot;