import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: 'https://petstore.swagger.io/v2/swagger.json',
    output: {
      target: './app/generated/api.ts',
      client: 'react-query',
      override: {
        mutator: {
          path: './app/lib/api-client.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          shouldExportQueryKey: true,
          useMutation: true,
          useInfinite: false,
          useInfiniteQueryParam: 'pageParam',
        }
      },
    },
  },
});
