import type { Currency } from "~/types/currency";

export const allCurrencies: Currency[] = [
  {
    code: "USDT",
    name: "테더",
    logo: "/usdt-logo.png",
  },
  {
    code: "KAIA",
    name: "카이아",
    logo: "/kaia-wallet.png",
  },
  {
    code: "KRW",
    name: "원화",
    logo: "/krw-logo.png",
    isComingSoon: true,
  },
];

// Get currency balance from real pot data
export const getCurrencyBalance = (
  currencyCode: string,
  balanceProvider?: { getFormattedBalance: (token: 'usdt' | 'kaia') => string }
) => {
  // Return real balance data if provider is available
  if (balanceProvider) {
    switch (currencyCode.toUpperCase()) {
      case 'USDT':
        return balanceProvider.getFormattedBalance('usdt');
      case 'KAIA':
        return balanceProvider.getFormattedBalance('kaia');
      case 'KRW':
        return "0"; // KRW not supported yet
      default:
        return "0";
    }
  }

  // Return "0" if no provider (loading state or not authenticated)
  return "0";
};
