import React from "react";

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import Main from "./Main";

Sentry.init({
  dsn: "https://5f072f49733e81a03b3882e1f4d3cf8c@o4505882243760128.ingest.sentry.io/4505882244808704",
  release: "release version",
  environment: "production",
  normalizeDepth: 6,
  integrations: [
    new Sentry.Integrations.Breadcrumbs({ console: true }),
    new BrowserTracing(),
  ],
});

export default function App() {
  // Sentry.captureMessage("에러가 발생하였습니다!");

  const errorHandler = async () => {
    try {
      //
    } catch (error) {
      const { method, url, params, headers } = error.config; // axios의 error객체
      const { data, status } = error.response; // axios의 error객체
      Sentry.withScope((scope) => {
        scope.setTag("type", "api");
        Sentry.captureException(`에러 발생 ${error}`);

        // Sentry.setContext("API Request Detail", {
        //   method,
        //   url,
        //   params,
        //   data,
        //   headers,
        // });
      });

      // Sentry.setContext("API Response Detail", {
      //   status,
      //   data,
      // });
    }
  };

  return (
    <Sentry.ErrorBoundary
      fallback={<p>에러가 발생하였습니다. 잠시 후 다시 시도해주세요.</p>}
    >
      <Main />
    </Sentry.ErrorBoundary>
  );
}
