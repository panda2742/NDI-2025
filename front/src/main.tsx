import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useMediaQuery } from "react-responsive";

import "@css/reset.css";
import "@css/global.scss";

import Ubuntu from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Ubuntu />
    </StrictMode>,
);
