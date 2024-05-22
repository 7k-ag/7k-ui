import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "./styles/global.css";

import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
  SuiClientProvider,
  WalletProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import { uiKitDarkTheme } from "./themes/index.tsx";
import { LazyMotion } from "framer-motion";
import useTheme from "./hooks/useTheme.tsx";
import { useScreenSize } from "./hooks/dom/useScreenSize.tsx";
import { getDefaultStore } from "jotai";
import { screenSizeAtom } from "./atoms/layout.atom.ts";

const loadFramerMotionFeatures = () =>
  import("@/utils/motion/domMax").then((res) => res.default);

const queryClient = new QueryClient();

const { networkConfig } = createNetworkConfig({
  localnet: { url: getFullnodeUrl("localnet") },
  devnet: { url: getFullnodeUrl("devnet") },
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

const GlobalHooks = () => {
  useTheme();
  const screenSize = useScreenSize();
  useEffect(() => {
    getDefaultStore().set(screenSizeAtom, screenSize);
  }, [screenSize]);
  return null;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider
          networks={networkConfig}
          defaultNetwork={import.meta.env.VITE_NETWORK || "devnet"}
        >
          <WalletProvider theme={uiKitDarkTheme} autoConnect>
            <LazyMotion features={loadFramerMotionFeatures}>
              <GlobalHooks />
              <App />
            </LazyMotion>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </Theme>
  </React.StrictMode>,
);
