import { Card, Button } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    desc: "Local testing with CSV uploads and dashboards.",
    features: ["2 users", "CSV ingestion", "Basic dashboard"]
  },
  {
    name: "Growth",
    price: "$49/mo",
    desc: "For small teams needing audit trails and admin controls.",
    features: ["Role-based access", "Upload history", "Contact inbox"]
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Extended SLAs, SSO, and rollout support.",
    features: ["Custom integrations", "Deployment support", "Advisory"]
  }
];

const PricingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="section">
      <div className="marketing-container">
        <div className="pill">Pricing</div>
        <h2>Simple tiers that scale with your compliance needs</h2>
        <div className="grid">
          {tiers.map((tier) => (
            <Card key={tier.name}>
              <h3>{tier.name}</h3>
              <p className="muted" style={{ margin: "6px 0 12px" }}>
                {tier.desc}
              </p>
              <h2 style={{ margin: "8px 0" }}>{tier.price}</h2>
              <ul className="muted" style={{ paddingLeft: 16, lineHeight: 1.6 }}>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Button primary fullWidth onClick={() => navigate("/register")} style={{ marginTop: 12 }}>
                Choose {tier.name}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
