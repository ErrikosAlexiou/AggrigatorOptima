import { useEffect, useState } from "react";
import { Page, Layout, LegacyCard, Text, Button, BlockStack } from "@shopify/polaris";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";

type UploadSummary = {
  id: number;
  filename: string;
  rowsReceived: number;
  rowsInserted: number;
  rowsFailed: number;
  createdAt: string;
  uploadedBy?: { id: number; email: string };
};

const ReportsPage = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<any>(null);
  const [uploads, setUploads] = useState<UploadSummary[]>([]);

  useEffect(() => {
    loadMetrics();
    if (user?.role === "ADMIN") {
      loadUploads();
    }
  }, [user]);

  const loadMetrics = async () => {
    const resp = await api.get("/api/v1/metrics/summary");
    setMetrics(resp.data);
  };

  const loadUploads = async () => {
    try {
      const resp = await api.get("/api/v1/uploads");
      setUploads(resp.data.uploads || []);
    } catch {
      setUploads([]);
    }
  };

  const downloadCsv = () => {
    if (!metrics) return;
    const lines = [
      "metric,value",
      `observations,${metrics.totals.observations}`,
      `deforestation_count,${metrics.totals.deforestationCount}`,
      `avg_ndvi,${metrics.totals.avg_ndvi}`,
      `avg_tree_cover,${metrics.totals.avg_tree_cover}`
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "report-summary.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Page
      title="Reports & Exports"
      subtitle="Share quick summaries with stakeholders"
      primaryAction={{ content: "Download CSV summary", onAction: downloadCsv }}>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Current summary" sectioned>
            {metrics ? (
              <BlockStack gap="150">
                <Text as="p">Observations: {metrics.totals.observations}</Text>
                <Text as="p">Deforestation flagged: {metrics.totals.deforestationCount}</Text>
                <Text as="p">Average NDVI: {metrics.totals.avg_ndvi.toFixed(3)}</Text>
                <Text as="p">
                  Average tree cover: {metrics.totals.avg_tree_cover.toFixed(2)}%
                </Text>
              </BlockStack>
            ) : (
              <Text as="p">No metrics yet.</Text>
            )}
          </LegacyCard>
        </Layout.Section>
        {user?.role === "ADMIN" && (
          <Layout.Section>
            <LegacyCard title="Recent uploads" sectioned>
              {uploads.length ? (
                <BlockStack gap="100">
                  {uploads.map((u) => (
                    <Text as="p" key={u.id}>
                      {u.filename} — inserted {u.rowsInserted}/{u.rowsReceived} (
                      {new Date(u.createdAt).toLocaleString()}) by {u.uploadedBy?.email || "unknown"}
                    </Text>
                  ))}
                </BlockStack>
              ) : (
                <Text as="p">No uploads recorded yet.</Text>
              )}
            </LegacyCard>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
};

export default ReportsPage;
