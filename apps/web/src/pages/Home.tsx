import { Button } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="marketing-hero">
        <div className="marketing-container">
          <div>
            <div className="pill">Aggregator Optima</div>
            <h1 className="hero-title">Operational ESG data, cleaned and dashboard-ready.</h1>
            <p className="hero-subtitle">
              Ingest satellite and operational CSVs, validate them against strict schemas, and ship
              dashboards and compliance evidence your teams can trust.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
              <Button primary size="large" onClick={() => navigate("/login")}>
                Go to dashboard
              </Button>
              <Button onClick={() => navigate("/about")}>Learn more</Button>
            </div>
            <p className="muted" style={{ marginTop: 14, maxWidth: 520 }}>
              Schema validation, RBAC, and upload history built-in.
            </p>
          </div>
          <div className="card">
            <div className="pill">Why teams pick us</div>
            <ul className="muted" style={{ lineHeight: 1.7 }}>
              <li>CSV ingestion with trimming, validation, and helpful failure reports</li>
              <li>Role-based dashboards with JWT + refresh cookie security</li>
              <li>Accessible Polaris UI and export-ready summaries</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="marketing-container">
          <h2>Built for compliance-minded operators</h2>
          <div className="grid">
            <div className="card">
              <h3>CSV to insight</h3>
              <p className="muted">
                Uploads stream through validation, so data lands cleanly with clear row-level errors.
              </p>
            </div>
            <div className="card">
              <h3>Dashboards that convert</h3>
              <p className="muted">
                KPIs for deforestation, NDVI, and tree cover ready for stakeholder updates.
              </p>
            </div>
            <div className="card">
              <h3>Governance-first</h3>
              <p className="muted">
                Secure auth, upload audit trails, and exportable metrics for your compliance packs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 80 }}>
        <div className="marketing-container">
          <div className="card" style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <h3>Ready to see it live?</h3>
              <p className="muted">
                Login to view the dashboard or register a new account to explore the workflow end to end.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button onClick={() => navigate("/register")}>Create account</Button>
              <Button primary onClick={() => navigate("/login")}>
                Launch app
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
