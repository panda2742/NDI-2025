import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@css/reset.css";
import "@css/global.scss";

import Ubuntu from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Ubuntu />
    </StrictMode>,
);
