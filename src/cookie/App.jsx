import React from "react";
import { CookiesProvider } from "react-cookie";
import Main from "./components/Main";

export default function App() {
  return (
    <CookiesProvider>
      <Main />
    </CookiesProvider>
  );
}
