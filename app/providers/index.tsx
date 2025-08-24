import React from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const appId = "cmel98g0x02u6l40btr617b87";

  return (
    <React.StrictMode>
      <PrivyProvider appId={appId}>
        <SmartWalletsProvider>{children}</SmartWalletsProvider>
      </PrivyProvider>
    </React.StrictMode>
  );
}
