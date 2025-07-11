import App from "./app.tsx";
import "@/assets/global.css";
import Layout from "@/components/layout.tsx";
import "@/i18n";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>
);
