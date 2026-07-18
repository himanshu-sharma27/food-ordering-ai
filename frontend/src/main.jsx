import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 2500,
                    }}
                />

                <App />

            </CartProvider>
        </BrowserRouter>
    </StrictMode>
);