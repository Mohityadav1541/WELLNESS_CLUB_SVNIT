import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  const errorMessage = "❌ Missing VITE_CLERK_PUBLISHABLE_KEY environment variable. Please check your .env file.";
  console.error(errorMessage);
  
  if (import.meta.env.PROD) {
    document.getElementById("root")!.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui;">
        <div style="text-align: center; padding: 2rem;">
          <h1 style="color: #dc2626; margin-bottom: 1rem;">Configuration Error</h1>
          <p>The application is missing required environment variables.</p>
          <p style="margin-top: 0.5rem; color: #6b7280;">Please contact the administrator.</p>
        </div>
      </div>
    `;
    throw new Error(errorMessage);
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
