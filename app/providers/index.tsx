import React, { useState, useEffect, Suspense } from "react";

// PrivyProvider를 dynamic import로 처리
const PrivyProvider = React.lazy(() =>
  import("@privy-io/react-auth").then((module) => ({
    default: module.PrivyProvider,
  }))
);

const SmartWalletProvider = React.lazy(() =>
  import("@privy-io/react-auth/smart-wallets").then((module) => ({
    default: module.SmartWalletsProvider,
  }))
);

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
    return <React.StrictMode>{children}</React.StrictMode>;
  }

  // 클라이언트 사이드에서만 PrivyProvider 렌더링
  return (
    <React.StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <PrivyProvider appId={appId}>
          <SmartWalletProvider>{children}</SmartWalletProvider>
        </PrivyProvider>
      </Suspense>
    </React.StrictMode>
  );
}
