import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryErrorResetBoundary,
} from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

const queryClient = new QueryClient();

const getFetchData = async ({ delay }) => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const data = await fetch("https://jsonplaceholder.typicod.com/posts/1").then(
    (response) => response.json()
  );
  return data;
};

const SubComponent = ({ delay }) => {
  const { data } = useQuery(
    ["serverData"],
    () => getFetchData({ delay: delay }),
    {
      suspense: true,
      useErrorBoundary: true, // suspense이 true일 경우 default로 true
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  // const [data, setData] = useState({});

  // useEffect(() => {
  //   getFetchData({ delay }).then((res) => setData(res));
  // }, []);

  return <div>{JSON.stringify(data)}</div>;
};

export default function App() {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
        <Suspense fallback={<h1>Loading...</h1>}>
          <SubComponent delay={2000} />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
