import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { UserDataProvider } from "./context/userDataContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserDataProvider>
      <App />
    </UserDataProvider>
  </StrictMode>
);
