import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Layout from "./components/layout/Layout.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NuqsAdapter>
      <Layout>
        <App />
      </Layout>
    </NuqsAdapter>
  </StrictMode>,
);
