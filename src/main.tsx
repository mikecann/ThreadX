import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { createRoot } from "react-dom/client";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

const container = document.getElementById("root")!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <NextUIProvider theme={darkTheme}>
        <App />
      </NextUIProvider>
    </ConvexProvider>
  </StrictMode>
);
