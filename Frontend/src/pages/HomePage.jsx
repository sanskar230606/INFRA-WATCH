import React, { useState, useEffect } from "react";
import { HomeSectionOne } from "../components/home/HomeSectionOne";
import { HomeSectionTwo } from "../components/risk/HomeSectionTwo";
import { HomeSectionThree } from "../components/intelligence/HomeSectionThree";

export const HomePage = () => {
  const [activeNav, setActiveNav] = useState("Search");

  // IntersectionObserver to dynamically track active section during scroll
  useEffect(() => {
    const section1 = document.getElementById("home-section-1");
    const section2 = document.getElementById("project-risk-overview");
    const section3 = document.getElementById("project-intelligence");
    const footer = document.getElementById("contact-footer");

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "contact-footer") {
            setActiveNav("Contact Us");
          } else if (entry.target.id === "project-intelligence") {
            setActiveNav("About");
          } else if (entry.target.id === "project-risk-overview") {
            setActiveNav("Stats");
          } else if (entry.target.id === "home-section-1") {
            setActiveNav("Search");
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.25
    });

    if (section1) observer.observe(section1);
    if (section2) observer.observe(section2);
    if (section3) observer.observe(section3);
    if (footer) observer.observe(footer);

    return () => {
      if (section1) observer.unobserve(section1);
      if (section2) observer.unobserve(section2);
      if (section3) observer.unobserve(section3);
      if (footer) observer.unobserve(footer);
    };
  }, []);

  // Smooth navigation handler
  const handleNavigate = (link) => {
    if (link.targetId) {
      const el = document.getElementById(link.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveNav(link.label);
      }
    }
  };

  return (
    <div className="home-page-container">
      {/* SECTION 1 — LANDING + PROJECT SEARCH (~100vh) */}
      <HomeSectionOne activeNav={activeNav} onNavigate={handleNavigate} />

      {/* SECTION 2 — INFRASTRUCTURE RISK OVERVIEW (~100vh) */}
      <HomeSectionTwo />

      {/* SECTION 3 — PROJECT INTELLIGENCE + FOOTER (~100vh) */}
      <HomeSectionThree onNavigate={handleNavigate} />
    </div>
  );
};
