import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
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
          defaultChain: {
            id: 8217,
            name: "Kaia Mainnet",
            network: "kaia-mainnet",
            nativeCurrency: {
              decimals: 18,
              name: "KAIA",
              symbol: "KAIA",
            },
            rpcUrls: {
              default: {
                http: [
                  "https://8217.rpc.thirdweb.com/f00f9bfe16df51cdf033331e0d62ca76",
                ],
              },
              public: {
                http: [
                  "https://8217.rpc.thirdweb.com/f00f9bfe16df51cdf033331e0d62ca76",
                ],
              },
            },
            blockExplorers: {
              default: {
                name: "Kaiascan",
                url: "https://kaiascan.io",
              },
            },
          },
          supportedChains: [
            {
              id: 8217,
              name: "Kaia Mainnet",
              network: "kaia-mainnet",
              nativeCurrency: {
                decimals: 18,
                name: "KAIA",
                symbol: "KAIA",
              },
              rpcUrls: {
                default: {
                  http: [
                    "https://8217.rpc.thirdweb.com/f00f9bfe16df51cdf033331e0d62ca76",
                  ],
                },
                public: {
                  http: [
                    "https://8217.rpc.thirdweb.com/f00f9bfe16df51cdf033331e0d62ca76",
                  ],
                },
              },
              blockExplorers: {
                default: {
                  name: "Kaiascan",
                  url: "https://kaiascan.io",
                },
              },
            },
          ],
        }}
      >
        <SmartWalletsProvider>
          {children}
        </SmartWalletsProvider>
      </PrivyProvider>
    </React.StrictMode>
  );
}
