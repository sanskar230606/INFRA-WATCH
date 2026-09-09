import React from "react";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { RouterProvider, useRouter } from "./context/RouterContext";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";

function AppRoutes() {
  const { isProjectDetails } = useRouter();

  if (isProjectDetails) {
    return <ProjectDetailsPage />;
  }

  return <HomePage />;
}

function App() {
  return (
    <AccessibilityProvider>
      <RouterProvider>
        <AppRoutes />
      </RouterProvider>
    </AccessibilityProvider>
  );
}

export default App;
