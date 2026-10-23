import React, { createContext, useContext, useState, useEffect } from "react";

const RouterContext = createContext(null);

export const RouterProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || "/");

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to, { replace = false } = {}) => {
    if (replace) {
      window.history.replaceState({}, "", to);
    } else {
      window.history.pushState({}, "", to);
    }
    setCurrentPath(to.split("?")[0].split("#")[0] || "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
  };

  // Match /projects/:projectCode
  const projectMatch = currentPath.match(/^\/projects\/([^/]+)/);
  const projectCodeParam = projectMatch ? decodeURIComponent(projectMatch[1]) : null;

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        navigate,
        goBack,
        isProjectDetails: !!projectCodeParam,
        projectCodeParam
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a RouterProvider");
  }
  return context;
};
