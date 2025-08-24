import KRWLogo from "~/routes/assets/krw-logo.png";
import USDTLogo from "~/routes/assets/usdt-logo.png";
import KaiaLogo from "~/routes/assets/kaia-wallet.png";
import type { Currency } from "~/types/currency";

export const allCurrencies: Currency[] = [
    {
        code: "USDT",
        name: "테더",
        logo: USDTLogo,
    },
    {
        code: "KAIA",
        name: "카이아",
        logo: KaiaLogo,
    },
    {
        code: "KRW",
        name: "원화",
        logo: KRWLogo,
        isComingSoon: true,
    },
];

// TODO: 각 통화별 잔액 매핑 (실제로는 주스탠다드 등 API에서 가져와야 함)
export const getCurrencyBalance = (currencyCode: string) => {
    const balances: Record<string, string> = {
        USDT: "10.43",
        KAIA: "5.00",
        KRW: "0",
    };
    return balances[currencyCode] || "0";
};
