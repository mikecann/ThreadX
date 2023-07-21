import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { createRoot } from "react-dom/client";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./common/theme";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ConvexProvider client={convex}>
        <ClerkProvider publishableKey="pk_test_dG91Z2gtY29icmEtMTMuY2xlcmsuYWNjb3VudHMuZGV2JA">
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <App />
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </ConvexProvider>
    </ChakraProvider>
  </StrictMode>,
);
