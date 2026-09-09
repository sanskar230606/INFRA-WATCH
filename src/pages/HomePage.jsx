import React, { useState, useEffect } from "react";
import { HomeSectionOne } from "../components/home/HomeSectionOne";
import { HomeSectionTwo } from "../components/risk/HomeSectionTwo";

export const HomePage = () => {
  const [activeNav, setActiveNav] = useState("Search");

  // IntersectionObserver to dynamically track active section during scroll
  useEffect(() => {
    const section1 = document.getElementById("home-section-1");
    const section2 = document.getElementById("project-risk-overview");

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "project-risk-overview") {
            setActiveNav("Stats");
          } else if (entry.target.id === "home-section-1") {
            setActiveNav("Search");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.35
    });

    if (section1) observer.observe(section1);
    if (section2) observer.observe(section2);

    return () => {
      if (section1) observer.unobserve(section1);
      if (section2) observer.unobserve(section2);
    };
  }, []);

  // Smooth navigation handler
  const handleNavigate = (link) => {
    if (link.targetId) {
      const el = document.getElementById(link.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        if (link.label === "Stats") {
          setActiveNav("Stats");
        } else if (link.label === "Search" || link.label === "Home") {
          setActiveNav(link.label === "Home" ? "Home" : "Search");
        }
      }
    }
  };

  return (
    <div className="home-page-container">
      {/* SECTION 1 — LANDING + PROJECT SEARCH (~100vh) */}
      <HomeSectionOne activeNav={activeNav} onNavigate={handleNavigate} />

      {/* SECTION 2 — PROJECT RISK OVERVIEW (~100vh) */}
      <HomeSectionTwo />

      {/* SECTION 3 — [Placeholder for future implementation: Deep Predictive Analytics Models] */}
    </div>
  );
};
