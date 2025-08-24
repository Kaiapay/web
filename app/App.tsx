import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { queryClient } from "./lib/queryClient";
import Providers from "./providers";
import ProtectedRoute from "./components/ProtectedRoute";

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

            {/* 비로그인 사용자 접근 가능 */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute requireAuth={false} redirectTo="/home">
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />

            {/* 로그인이 필요 페이지 */}
            <Route
              path="/home"
              element={
                <ProtectedRoute requireAuth={true}>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send"
              element={
                <ProtectedRoute requireAuth={true}>
                  <SendPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send/via-phone"
              element={
                <ProtectedRoute requireAuth={true}>
                  <SendViaPhonePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send/via-kaiapay-id"
              element={
                <ProtectedRoute requireAuth={true}>
                  <SendViaKaiaPayIdPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send/via-wallet-address"
              element={
                <ProtectedRoute requireAuth={true}>
                  <SendViaWalletAddressPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/send/amount"
              element={
                <ProtectedRoute requireAuth={true}>
                  <SendAmountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fill"
              element={
                <ProtectedRoute requireAuth={true}>
                  <FillPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wallet-connect"
              element={
                <ProtectedRoute requireAuth={true}>
                  <WalletConnectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute requireAuth={true}>
                  <TransactionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/receive-link"
              element={
                <ProtectedRoute requireAuth={true}>
                  <ReceiveLinkPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/kaiapay-card"
              element={
                <ProtectedRoute requireAuth={true}>
                  <KaiaPayCardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/luckybox"
              element={
                <ProtectedRoute requireAuth={true}>
                  <LuckyBoxPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute requireAuth={true}>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account/change-id"
              element={
                <ProtectedRoute requireAuth={true}>
                  <ChangeIdPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Providers>
  );
}
