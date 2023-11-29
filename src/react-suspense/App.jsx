import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import Component from "./Component";
import Second from "./Second";

export const queryErrorHandler = (error) => {
  // toast(`데이터를 가져오지 못했습니다! ${error.message}`);
  console.log("stes");
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      retry: 0,
      suspense: true,
    },
  },
});

export default function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component />
          <Second />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
