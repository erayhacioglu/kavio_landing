import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import "./assets/scss/reset.scss";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Layout from "./layouts/Layout";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </ErrorBoundary>
);
