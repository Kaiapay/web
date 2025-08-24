import { defineConfig } from "orval";

export default defineConfig({
  kaiapay: {
    input: "https://dev-api.kaiapay.app/openapi.json",
    output: {
      target: "./app/generated/api.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "./app/lib/api-client.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          shouldExportQueryKey: true,
          useMutation: true,
          useInfinite: false,
          useInfiniteQueryParam: "pageParam",
        },
      },
    },
    hooks: {
      afterAllFilesWrite:
        "npx prettier --write --ignore-path .prettierignore ./app/generated/api.ts",
    },
  },
});
