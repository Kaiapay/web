import { PrivyProvider, addRpcUrlOverrideToChain } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { kaia } from "viem/chains";
import React from "react";
import { BalanceProvider } from "../contexts/BalanceContext";
import { KAIA_RPC_URL } from "../lib/constants";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const appId = "cmel98g0x02u6l40btr617b87";

  return (
    <React.StrictMode>
      <PrivyProvider
        appId={appId}
        config={{
          defaultChain: addRpcUrlOverrideToChain(kaia, KAIA_RPC_URL),
          supportedChains: [addRpcUrlOverrideToChain(kaia, KAIA_RPC_URL)],
          embeddedWallets: {
            createOnLogin: "all-users",
          },
          appearance: {
            walletChainType: "ethereum-only",
            walletList: [],
          },
          loginMethods: ["email", "google", "twitter"],
        }}
      >
        <SmartWalletsProvider>
          <BalanceProvider>
            {children}
          </BalanceProvider>
        </SmartWalletsProvider>
      </PrivyProvider>
    </React.StrictMode>
  );
}
