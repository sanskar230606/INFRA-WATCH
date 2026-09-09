import React from "react";
import { APP_CONFIG } from "../../config/branding";
import { 
  Building2, 
  Users, 
  Clock, 
  Coins, 
  FileCheck2, 
  Landmark, 
  Target, 
  Eye 
} from "lucide-react";

export const BenefitsGrid = () => {
  return (
    <div className="benefits-section">
      {/* 1. BENEFITS FOR GOVERNMENT */}
      <div className="benefits-group">
        <div className="benefits-group-header">
          <div className="benefits-title-row">
            <Building2 size={18} className="benefits-icon" />
            <h3 className="benefits-group-title">Benefits for Government</h3>
          </div>
          <span className="benefits-sub-badge">ADMINISTRATIVE EFFICIENCY</span>
        </div>

        <div className="benefits-cards-grid">
          {APP_CONFIG.governmentBenefits.map((b) => (
            <div key={b.title} className="benefit-card">
              <h4 className="benefit-card-title">{b.title}</h4>
              <p className="benefit-card-desc">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BENEFITS FOR THE PUBLIC */}
      <div className="benefits-group">
        <div className="benefits-group-header">
          <div className="benefits-title-row">
            <Users size={18} className="benefits-icon" />
            <h3 className="benefits-group-title">Benefits for the Public</h3>
          </div>
          <span className="benefits-sub-badge">NATIONAL SOCIO-ECONOMIC IMPACT</span>
        </div>

        <div className="benefits-cards-grid">
          {APP_CONFIG.publicBenefits.map((b) => (
            <div key={b.title} className="benefit-card">
              <h4 className="benefit-card-title">{b.title}</h4>
              <p className="benefit-card-desc">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
