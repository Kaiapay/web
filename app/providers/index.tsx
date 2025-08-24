import React, { useState, useEffect, Suspense } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  const [isClient, setIsClient] = useState(false);
  const appId = "cmel98g0x02u6l40btr617b87";

  useEffect(() => {
    setIsClient(true);
  }, []);

  // 서버 사이드에서는 PrivyProvider 없이 렌더링
  if (!isClient) {
    return <>{children}</>;
  }

  // 클라이언트 사이드에서만 PrivyProvider 렌더링
  return (
    <PrivyProvider
      appId={appId}
      onSuccess={(user) => {
        console.log(`User ${user.id} logged in!`);
      }}
    >
      <SmartWalletsProvider>
        {children}
      </SmartWalletsProvider>
    </PrivyProvider>
  );
}