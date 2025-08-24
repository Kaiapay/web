import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { kaia } from "viem/chains";
import React from "react";

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
          defaultChain: kaia,
          supportedChains: [kaia],
          embeddedWallets: {
            createOnLogin: "all-users",
          },
          appearance: {
            walletChainType: "ethereum-only",
            walletList: [],
          },
        }}
      >
        <SmartWalletsProvider>{children}</SmartWalletsProvider>
      </PrivyProvider>
    </React.StrictMode>
  );
}
