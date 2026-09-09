import React from "react";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <AccessibilityProvider>
      <HomePage />
    </AccessibilityProvider>
  );
}

export default App;
