import React, { useState } from "react";
import { APP_CONFIG } from "../../config/branding";
import { ShieldCheck, Menu, X } from "lucide-react";

export const MainHeader = ({ activeNav = "Search", onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(link);
    } else if (link.targetId) {
      const el = document.getElementById(link.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className="main-header" role="banner">
      {/* LEFT SIDE — NAVIGATION (Home | Search | Stats | About | Contact Us) */}
      <nav 
        className={`header-nav ${mobileMenuOpen ? "mobile-open" : ""}`}
        aria-label="Main Navigation"
      >
        {APP_CONFIG.navLinks.map((link) => {
          const isActive = activeNav === link.label;
          return (
            <a
              key={link.label}
              href={`#${link.targetId}`}
              className={`nav-link ${isActive ? "active" : ""}`}
              onClick={(e) => handleNavClick(e, link)}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && <span className="nav-link-dot" aria-hidden="true"></span>}
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* RIGHT SIDE — PROJECT BRANDING */}
      <div className="header-branding" aria-label="System Brand">
        <div className="brand-text-block">
          <div className="brand-title-row">
            <span className="brand-name">{APP_CONFIG.brandName}</span>
            <span className="brand-badge">OCMS / AI</span>
          </div>
          <span className="brand-subtext">{APP_CONFIG.brandTagline}</span>
        </div>

        {/* Professional National Infrastructure Emblem */}
        <div className="brand-emblem-icon" title="MoSPI Infrastructure Monitoring Gateway" aria-hidden="true">
          <ShieldCheck size={22} />
        </div>
      </div>
    </header>
  );
};
