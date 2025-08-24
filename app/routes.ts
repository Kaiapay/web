import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/splash/index.tsx"),
  route("pets", "routes/pets.tsx"),
  route("playground", "routes/playground.tsx"),
  route("pc", "routes/pc.tsx"),
  route("send", "routes/send/index.tsx"),
  route("send/via-phone", "routes/send/via-phone/index.tsx"),
  route("send/via-kaiapay-id", "routes/send/via-kaiapay-id/index.tsx"),
  route("send/via-wallet-address", "routes/send/via-wallet-address/index.tsx"),
  route("send/amount", "routes/send/amount/index.tsx"),
  route("fill", "routes/fill/index.tsx"),
  route("wallet-connect", "routes/wallet-connect/index.tsx"),
  route("transactions", "routes/transactions/index.tsx"),
  route("onboarding", "routes/onboarding/index.tsx"),
  route("home", "routes/home/index.tsx"),
  route("receive-link", "routes/receive-link/index.tsx"),
  route("kaiapay-card", "routes/kaiapay-card/index.tsx"),
  route("luckybox", "routes/luckybox/index.tsx"),
  route("account", "routes/account/index.tsx")
] satisfies RouteConfig;
