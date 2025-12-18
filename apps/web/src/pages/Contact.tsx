import { useState } from "react";
import { Layout, LegacyCard, TextField, Button, InlineStack, Banner, BlockStack } from "@shopify/polaris";
import { api } from "../api/client";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    setStatus("idle");
    try {
      await api.post("/api/v1/contact", { name, email, company, message });
      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="marketing-container">
        <div className="pill">Contact</div>
        <h2>Tell us about your data workflows</h2>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <BlockStack gap="300">
                {status === "success" && (
                  <Banner tone="success" title="Thanks!">
                    We received your message and will follow up quickly.
                  </Banner>
                )}
                {status === "error" && (
                  <Banner tone="critical" title="Submission failed">
                    Please double-check the fields and try again.
                  </Banner>
                )}
                <TextField label="Name" value={name} onChange={setName} autoComplete="name" />
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                />
                <TextField label="Company" value={company} onChange={setCompany} />
                <TextField
                  label="Message"
                  value={message}
                  onChange={setMessage}
                  multiline={4}
                  autoComplete="off"
                />
                <InlineStack align="end">
                  <Button primary loading={loading} onClick={submit}>
                    Submit
                  </Button>
                </InlineStack>
              </BlockStack>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </div>
    </div>
  );
};

export default ContactPage;
