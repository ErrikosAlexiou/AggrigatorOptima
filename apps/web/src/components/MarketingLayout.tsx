import { Link, useLocation } from "react-router-dom";
import { Button } from "@shopify/polaris";
import "./MarketingLayout.css";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
  { label: "Sitemap", to: "/sitemap" }
];

export const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="marketing-shell">
      <header className="marketing-header">
        <div className="marketing-container header-inner">
          <Link to="/" className="brand">
            <img src="/logo.png" alt="Aggregator Optima logo" />
            <span className="brand-text">Aggregator Optima</span>
          </Link>
          <nav className="nav-links">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={pathname === link.to ? "active" : ""}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="nav-actions">
            <Link to="/login">
              <Button size="slim">Login</Button>
            </Link>
            <Link to="/register">
              <Button primary size="slim">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="marketing-footer">
        <div className="marketing-container footer-grid">
          <div>
            <Link to="/" className="brand">
              <img src="/logo.png" alt="Aggregator Optima logo" />
              <span className="brand-text">Aggregator Optima</span>
            </Link>
            <p className="footer-tagline">
              ESG-ready ingestion, validation, and dashboards built for compliance teams.
            </p>
          </div>
          <div>
            <p className="footer-heading">Explore</p>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/services">Services</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
          <div>
            <p className="footer-heading">Product</p>
            <div className="footer-links">
              <Link to="/login">Dashboard</Link>
              <Link to="/register">Create account</Link>
              <a href="/app/upload">CSV upload</a>
            </div>
          </div>
        </div>
        <div className="marketing-container footer-meta">
          <span>© {new Date().getFullYear()} Aggregator Optima</span>
          <Link to="/sitemap">Sitemap</Link>
        </div>
      </footer>
    </div>
  );
};
