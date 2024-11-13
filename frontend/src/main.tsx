import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/toaster"
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <Toaster/>
      <App />
    </RecoilRoot>
  </StrictMode>
);
