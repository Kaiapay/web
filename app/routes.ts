import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pets", "routes/pets.tsx"),
  route("playground", "routes/playground.tsx"),
  route("send", "routes/send/index.tsx"),
  route("send/via-phone", "routes/send/via-phone/index.tsx"),
  route("send/via-link", "routes/send/via-link/index.tsx"),
  route("send/via-kaiapay-id", "routes/send/via-kaiapay-id/index.tsx"),
  route("send/to-wallet", "routes/send/to-wallet/index.tsx"),
  route("splash", "routes/splash/index.tsx"),
  route("onboarding", "routes/onboarding/index.tsx")
] satisfies RouteConfig;
