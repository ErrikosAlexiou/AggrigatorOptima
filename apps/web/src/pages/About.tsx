import { Card } from "@shopify/polaris";

const AboutPage = () => (
  <div className="section">
    <div className="marketing-container">
      <div className="pill">About Aggregator Optima</div>
      <h2>Built for compliance-focused sustainability teams</h2>
      <div className="grid">
        <Card>
          <h3>Opinionated ingestion</h3>
          <p className="muted">
            CSV uploads are trimmed, validated, and inserted with row-level failure feedback, so you
            know what landed and what did not.
          </p>
        </Card>
        <Card>
          <h3>Secure by default</h3>
          <p className="muted">
            Bcrypt-hashed passwords, JWT access tokens, and refresh cookies with rotation to keep
            sessions tight.
          </p>
        </Card>
        <Card>
          <h3>Accessible UX</h3>
          <p className="muted">
            Polaris components, keyboard-friendly flows, and high-contrast layouts for busy operators.
          </p>
        </Card>
      </div>
    </div>
  </div>
);

export default AboutPage;
