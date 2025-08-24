import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { queryClient } from "./lib/queryClient";
import Providers from "./providers";

import SplashPage from "./routes/splash";
import HomePage from "./routes/home";
import SendPage from "./routes/send";
import SendViaPhonePage from "./routes/send/via-phone";
import SendViaKaiaPayIdPage from "./routes/send/via-kaiapay-id";
import SendViaWalletAddressPage from "./routes/send/via-wallet-address";
import SendAmountPage from "./routes/send/amount";
import FillPage from "./routes/fill";
import WalletConnectPage from "./routes/wallet-connect";
import TransactionsPage from "./routes/transactions";
import OnboardingPage from "./routes/onboarding";
import ReceiveLinkPage from "./routes/receive-link";
import KaiaPayCardPage from "./routes/kaiapay-card";
import LuckyBoxPage from "./routes/luckybox";
import AccountPage from "./routes/account";
import ChangeIdPage from "./routes/account/change-id";
import PlaygroundPage from "./routes/playground";
import PCPage from "./routes/pc";

export default function App() {
  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/pc" element={<PCPage />} />
            <Route path="/send" element={<SendPage />} />
            <Route path="/send/via-phone" element={<SendViaPhonePage />} />
            <Route
              path="/send/via-kaiapay-id"
              element={<SendViaKaiaPayIdPage />}
            />
            <Route
              path="/send/via-wallet-address"
              element={<SendViaWalletAddressPage />}
            />
            <Route path="/send/amount" element={<SendAmountPage />} />
            <Route path="/fill" element={<FillPage />} />
            <Route path="/wallet-connect" element={<WalletConnectPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/receive-link" element={<ReceiveLinkPage />} />
            <Route path="/kaiapay-card" element={<KaiaPayCardPage />} />
            <Route path="/luckybox" element={<LuckyBoxPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/change-id" element={<ChangeIdPage />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Providers>
  );
}
