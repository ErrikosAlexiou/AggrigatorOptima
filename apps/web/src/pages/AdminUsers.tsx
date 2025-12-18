import { useEffect, useState } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  DataTable,
  TextField,
  Button,
  Select,
  InlineStack,
  Banner
} from "@shopify/polaris";
import { api } from "../api/client";

type User = { id: number; email: string; role: "ADMIN" | "USER"; createdAt: string };

const AdminUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      const resp = await api.get("/api/v1/admin/users");
      setUsers(resp.data.users || []);
    } catch (err) {
      setError("Could not load users.");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async () => {
    setError(null);
    try {
      await api.post("/api/v1/admin/users", { email, password, role });
      setEmail("");
      setPassword("");
      setRole("USER");
      loadUsers();
    } catch (err) {
      setError("Could not create user.");
    }
  };

  const deleteUser = async (id: number) => {
    await api.delete(`/api/v1/admin/users/${id}`);
    loadUsers();
  };

  return (
    <Page title="User management" subtitle="Admin-only controls">
      <Layout>
        <Layout.Section>
          {error && (
            <Banner tone="critical" title="Error">
              {error}
            </Banner>
          )}
        </Layout.Section>
        <Layout.Section>
          <LegacyCard title="Create user" sectioned>
            <InlineStack gap="300" wrap={false}>
              <TextField label="Email" value={email} onChange={setEmail} autoComplete="email" />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete="new-password"
              />
              <Select
                label="Role"
                options={[
                  { label: "User", value: "USER" },
                  { label: "Admin", value: "ADMIN" }
                ]}
                value={role}
                onChange={(value) => setRole(value as "ADMIN" | "USER")}
              />
              <Button primary onClick={addUser}>
                Create
              </Button>
            </InlineStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard title="All users" sectioned>
            <DataTable
              columnContentTypes={["text", "text", "text", "text"]}
              headings={["Email", "Role", "Created", "Actions"]}
              rows={users.map((u) => [
                u.email,
                u.role,
                new Date(u.createdAt).toLocaleDateString(),
                <Button destructive onClick={() => deleteUser(u.id)} size="slim" key={u.id}>
                  Delete
                </Button>
              ])}
            />
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default AdminUsersPage;
