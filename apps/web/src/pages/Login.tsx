import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Page, LegacyCard, TextField, Button, Banner, BlockStack, InlineStack, Text } from "@shopify/polaris";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/app/dashboard?status=loggedin");
    } catch (err) {
      setError("Invalid credentials. Try admin@example.com or user@example.com.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page
      title={
        <Link to="/">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <img
              src="/logo.png"
              alt="Aggregator Optima logo"
              style={{ height: 56, width: "auto", objectFit: "contain", display: "block" }}
            />
            <strong style={{ fontSize: 18, color: "#0b2b3a" }}>Aggregator Optima</strong>
          </span>
        </Link>
      }
      subtitle="Access your Aggregator Optima workspace">
      <LegacyCard sectioned>
        <BlockStack gap="300">
          {params.get("status") === "loggedout" && (
            <Banner tone="success" title="Logged out">
              You have been signed out.
            </Banner>
          )}
          {error && (
            <Banner tone="critical" title="Login failed">
              {error}
            </Banner>
          )}
          <TextField label="Email" value={email} onChange={setEmail} autoComplete="email" />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
          <InlineStack align="space-between">
            <Text as="span">
              New here? <Link to="/register">Register</Link>
            </Text>
            <Button primary loading={loading} onClick={submit}>
              Login
            </Button>
          </InlineStack>
        </BlockStack>
      </LegacyCard>
    </Page>
  );
};

export default LoginPage;
