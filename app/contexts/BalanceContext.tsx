import { createContext, useContext, ReactNode } from "react";
import { useKaiaPayPot } from "../hooks/useKaiaPayPot";

interface BalanceContextType {
  getFormattedBalance: (token: 'usdt' | 'kaia') => string;
  isLoading: boolean;
  error: string;
  refreshBalances: () => void;
  isReady: boolean;
}

const BalanceContext = createContext<BalanceContextType | null>(null);

interface BalanceProviderProps {
  children: ReactNode;
}

export function BalanceProvider({ children }: BalanceProviderProps) {
  const {
    getFormattedBalance,
    isLoading,
    error,
    refreshBalances,
    isReady
  } = useKaiaPayPot();

  return (
    <BalanceContext.Provider
      value={{
        getFormattedBalance,
        isLoading,
        error,
        refreshBalances,
        isReady
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export function useBalance() {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
}

export default BalanceContext;