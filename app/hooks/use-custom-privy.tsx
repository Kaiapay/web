import {
  type UnsignedTransactionRequest,
  type User,
  useFundWallet,
  useLogin,
  usePrivy,
} from "@privy-io/react-auth";
import { useWallets } from "@privy-io/react-auth";
import { useCallback, useEffect, useState } from "react";

const chainId = 8217; // kaia mainnet

interface UsePrivyLoginReturn {
  // User state
  ready: boolean;
  authenticated: boolean;
  user: User | null;

  // Addresses
  walletAddress?: string;
  emailAddress?: string;

  // Actions
  login: () => Promise<void>;
  logout: () => void;
  fundWallet: () => Promise<void>;

  // Advanced actions (for when AGW is connected)
  signMessage: (message: string) => Promise<string>;
  sendTransaction: (
    txParams: Partial<UnsignedTransactionRequest>
  ) => Promise<string>;

  // Loading states
  isLoggingIn: boolean;
}

export const useCustomPrivy = (): UsePrivyLoginReturn => {
  const { ready, authenticated, user, logout: privyLogout } = usePrivy();
  const { login: privyLogin } = useLogin();
  const { fundWallet: privyFundWallet } = useFundWallet();
  const { wallets: connectedWallets } = useWallets();

  // Local state
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Derived state
  const emailAccount = user?.linkedAccounts.find(
    (account) => account.type === "email"
  );

  const walletAddress = user?.wallet?.address;
  const emailAddress = emailAccount?.address;

  // biome-ignore lint/correctness/useExhaustiveDependencies: userMe.mutateAsync
  useEffect(() => {
    if (!walletAddress) return;

    const updateUserMe = async () => {
      try {
        // mutate user
      } catch (error) {
        console.error("Failed to update user with wallet address:", error);
      }
    };

    updateUserMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  // Actions
  const login = useCallback(async () => {
    if (!ready || isLoggingIn) return;

    setIsLoggingIn(true);
    try {
      await privyLogin();
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  }, [ready, isLoggingIn, privyLogin]);

  const logout = useCallback(() => {
    privyLogout();
  }, [privyLogout]);

  const fundWallet = useCallback(async () => {
    if (!walletAddress) {
      throw new Error("No wallet address available");
    }
    await privyFundWallet(walletAddress);
  }, [walletAddress, privyFundWallet]);

  const signMessage = useCallback(
    async (message: string) => {
      const connectedEthWallet = connectedWallets.find(
        (w) => w.type === "ethereum"
      );
      if (!connectedEthWallet?.address) {
        throw new Error("No wallet available");
      }
      // Ensure correct chain
      try {
        await connectedEthWallet.switchChain(chainId);
      } catch {}
      const provider = await connectedEthWallet.getEthereumProvider();
      const signature = (await provider.request({
        method: "personal_sign",
        params: [message, connectedEthWallet.address],
      })) as string;
      return signature;
    },
    [connectedWallets]
  );

  const sendTransaction = useCallback(
    async (txParams: Partial<UnsignedTransactionRequest>) => {
      const connectedEthWallet = connectedWallets.find(
        (w) => w.type === "ethereum"
      );
      if (!connectedEthWallet?.address) {
        throw new Error("No wallet available");
      }
      // Ensure correct chain
      try {
        await connectedEthWallet.switchChain(chainId);
      } catch {}
      const provider = await connectedEthWallet.getEthereumProvider();
      const hash = (await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedEthWallet.address,
            data: txParams.data ?? "0x",
            to: txParams.to,
            value: txParams.value as any,
            gas: (txParams as any).gas ?? txParams.gasLimit,
            maxFeePerGas: txParams.maxFeePerGas as any,
            maxPriorityFeePerGas: txParams.maxPriorityFeePerGas as any,
          },
        ],
      })) as string;
      return hash;
    },
    [connectedWallets]
  );

  return {
    // User state
    ready,
    authenticated,
    user,

    // Addresses
    walletAddress,
    emailAddress,

    // Actions
    login,
    logout,
    fundWallet,
    signMessage,
    sendTransaction,

    // Loading states
    isLoggingIn,
  };
};
