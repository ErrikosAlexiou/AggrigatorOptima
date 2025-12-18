import { Card, Button } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

const ServicesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="section">
      <div className="marketing-container">
        <div className="pill">Services</div>
        <h2>Deployment-ready capabilities for sustainability teams</h2>
        <div className="grid">
          <Card>
            <h3>Data Operations</h3>
            <p className="muted">
              CSV ingestion with validation, trimming, and helpful failure reports. SQLite by
              default—ready to point to your warehouse.
            </p>
          </Card>
          <Card>
            <h3>Reporting & Assurance</h3>
            <p className="muted">
              KPI dashboards for deforestation, NDVI, and tree cover. Export summaries you can drop
              into compliance packs.
            </p>
          </Card>
          <Card>
            <h3>Enablement</h3>
            <p className="muted">
              Privacy-by-design notes, access reviews, and accessibility QA to keep rollouts aligned
              with policy.
            </p>
          </Card>
        </div>
        <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
          <Button primary onClick={() => navigate("/contact")}>
            Talk to us
          </Button>
          <Button onClick={() => navigate("/login")}>View dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
