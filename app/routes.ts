import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    async lazy() {
      const { default: Component } = await import("./components/RootLayout");
      const { RootErrorBoundary } = await import("./components/RootLayout");
      return {
        Component,
        ErrorBoundary: RootErrorBoundary,
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { default: Component } = await import("./routes/splash");
          return { Component };
        },
      },
      {
        path: "pets",
        async lazy() {
          const { default: Component } = await import("./routes/pets");
          return { Component };
        },
      },
      {
        path: "playground",
        async lazy() {
          const { default: Component } = await import("./routes/playground");
          return { Component };
        },
      },
      {
        path: "pc",
        async lazy() {
          const { default: Component } = await import("./routes/pc");
          return { Component };
        },
      },
      {
        path: "send",
        async lazy() {
          const { default: Component } = await import("./routes/send");
          return { Component };
        },
      },
      {
        path: "send/via-phone",
        async lazy() {
          const { default: Component } = await import(
            "./routes/send/via-phone"
          );
          return { Component };
        },
      },
      {
        path: "send/via-kaiapay-id",
        async lazy() {
          const { default: Component } = await import(
            "./routes/send/via-kaiapay-id"
          );
          return { Component };
        },
      },
      {
        path: "send/via-wallet-address",
        async lazy() {
          const { default: Component } = await import(
            "./routes/send/via-wallet-address"
          );
          return { Component };
        },
      },
      {
        path: "send/amount",
        async lazy() {
          const { default: Component } = await import("./routes/send/amount");
          return { Component };
        },
      },
      {
        path: "fill",
        async lazy() {
          const { default: Component } = await import("./routes/fill");
          return { Component };
        },
      },
      {
        path: "wallet-connect",
        async lazy() {
          const { default: Component } = await import(
            "./routes/wallet-connect"
          );
          return { Component };
        },
      },
      {
        path: "transactions",
        async lazy() {
          const { default: Component } = await import("./routes/transactions");
          return { Component };
        },
      },
      {
        path: "onboarding",
        async lazy() {
          const { default: Component } = await import("./routes/onboarding");
          return { Component };
        },
      },
      {
        path: "home",
        async lazy() {
          const { default: Component } = await import("./routes/home");
          return { Component };
        },
      },
      {
        path: "receive-link",
        async lazy() {
          const { default: Component } = await import("./routes/receive-link");
          return { Component };
        },
      },
      {
        path: "kaiapay-card",
        async lazy() {
          const { default: Component } = await import("./routes/kaiapay-card");
          return { Component };
        },
      },
      {
        path: "luckybox",
        async lazy() {
          const { default: Component } = await import("./routes/luckybox");
          return { Component };
        },
      },
    ],
  },
];
