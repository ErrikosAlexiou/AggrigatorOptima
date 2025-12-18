import { LegacyCard } from "@shopify/polaris";
import { Link } from "react-router-dom";

const sections = [
  {
    heading: "Public",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Pricing", to: "/pricing" },
      { label: "Contact", to: "/contact" },
      { label: "Sitemap", to: "/sitemap" }
    ]
  },
  {
    heading: "Accounts",
    links: [
      { label: "Login", to: "/login" },
      { label: "Register", to: "/register" }
    ]
  },
  {
    heading: "App",
    links: [
      { label: "Dashboard", to: "/app/dashboard" },
      { label: "Data", to: "/app/data" },
      { label: "Upload", to: "/app/upload" },
      { label: "Reports", to: "/app/reports" },
      { label: "Admin Users", to: "/app/admin/users" }
    ]
  }
];

const SitemapPage = () => (
  <div className="section">
    <div className="marketing-container">
      <div className="pill">Sitemap</div>
      <h2>Quick links across Aggregator Optima</h2>
      <LegacyCard sectioned>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 16 }}>
          {sections.map((section) => (
            <div key={section.heading} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <strong>{section.heading}</strong>
              {section.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: "#0b2b3a",
                    textDecoration: "none",
                    padding: "4px 0",
                    fontWeight: 500
                  }}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </LegacyCard>
    </div>
  </div>
);

export default SitemapPage;
