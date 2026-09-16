import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contextes/AuthContext.tsx";
import { FavorisProvider } from "./contextes/FavorisContext.tsx";
import { ThemeProvider } from "./contextes/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <FavorisProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </FavorisProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
