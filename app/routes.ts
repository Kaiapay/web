import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pets", "routes/pets.tsx"),
  route("playground", "routes/playground.tsx"),
  route("send", "routes/send/index.tsx"),
  route("send/via-phone", "routes/send/via-phone/index.tsx"),
  route("splash", "routes/splash/index.tsx"),
  route("onboarding", "routes/onboarding/index.tsx")
] satisfies RouteConfig;
