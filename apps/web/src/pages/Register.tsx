import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Page,
  LegacyCard,
  TextField,
  Button,
  Banner,
  BlockStack,
  InlineStack,
  Text,
  Checkbox
} from "@shopify/polaris";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const submit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      if (!consent) {
        setError("You must accept the Terms and Privacy notice to continue.");
        setLoading(false);
        return;
      }
      await register(email, password);
      setSuccess(true);
      navigate("/app/dashboard?status=welcome");
    } catch (err) {
      setError("Registration failed. Try a different email.");
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
      subtitle="Create a user account">
      <LegacyCard sectioned>
        <BlockStack gap="300">
          {error && (
            <Banner tone="critical" title="Registration failed">
              {error}
            </Banner>
          )}
          {success && (
            <Banner tone="success" title="Account created">
              You can now sign in.
            </Banner>
          )}
          <TextField label="Email" value={email} onChange={setEmail} autoComplete="email" />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
          <Checkbox
            label={
              <span>
                I agree to the{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Privacy notice (GDPR)
                </a>
              </span>
            }
            checked={consent}
            onChange={(value) => setConsent(value)}
          />
          <InlineStack align="space-between">
            <Text as="span">
              Have an account? <Link to="/login">Login</Link>
            </Text>
            <Button primary loading={loading} onClick={submit}>
              Register
            </Button>
          </InlineStack>
        </BlockStack>
      </LegacyCard>
    </Page>
  );
};

export default RegisterPage;
