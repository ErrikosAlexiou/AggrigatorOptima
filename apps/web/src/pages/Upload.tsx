import { useState, useCallback } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  DropZone,
  InlineStack,
  Button,
  Text,
  BlockStack,
  Banner
} from "@shopify/polaris";
import { api } from "../api/client";

const sampleCsv = `observation_id,cell_id,lat,lon,acquisition_date,year,month,sensor,ndvi,evi,cloud_cover_pct,land_cover_type,baseline_tree_cover_pct,tree_cover_pct,deforestation_flag,deforestation_amount_pct,disturbance_type,country_part,priority_conservation_area
1, A-100, 45.12, -71.4, 2024-01-15, 2024, 1, Sentinel-2, 0.52, 0.31, 5, Forest, 60.2, 62.1, 0, 0, None, North, 1
2, A-101, 45.10, -71.2, 2024-02-10, 2024, 2, Landsat-8, 0.44, 0.28, 8, Wetland, 55.2, 53.1, 1, 2.1, Logging, South, 0`;

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDrop = useCallback((_dropFiles: File[], accepted: File[]) => {
    setFile(accepted[0]);
  }, []);

  const uploadFile = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const resp = await api.post("/api/v1/uploads/csv", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setSummary(resp.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const downloadSample = () => {
    const blob = new Blob([sampleCsv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample-observations.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Page
      title="Upload CSV"
      subtitle="Drag-and-drop sustainability observations"
      primaryAction={{ content: "Download sample CSV", onAction: downloadSample }}>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Requirements" sectioned>
            <BlockStack gap="200">
              <Text as="p">Headers must match exactly and values will be trimmed automatically.</Text>
              <Text as="p">
                Required columns: observation_id, cell_id, lat, lon, acquisition_date, year, month,
                sensor, ndvi, evi, cloud_cover_pct, land_cover_type, baseline_tree_cover_pct,
                tree_cover_pct, deforestation_flag, deforestation_amount_pct, disturbance_type,
                country_part, priority_conservation_area.
              </Text>
            </BlockStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
            <DropZone allowMultiple={false} accept=".csv,text/csv" onDrop={handleDrop}>
              <DropZone.FileUpload actionTitle="Add CSV" />
              {file && (
                <Text as="p" variant="bodyMd">
                  Selected: {file.name}
                </Text>
              )}
            </DropZone>
            <div style={{ marginTop: "16px" }}>
              <InlineStack align="end" gap="200">
                <Button primary onClick={uploadFile} loading={uploading} disabled={!file}>
                  Upload
                </Button>
              </InlineStack>
            </div>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          {error && (
            <Banner tone="critical" title="Upload failed">
              {error}
            </Banner>
          )}
          {summary && (
            <LegacyCard title="Ingestion summary" sectioned>
              <BlockStack gap="100">
                <Text as="p">Rows received: {summary.rows_received}</Text>
                <Text as="p">Rows inserted: {summary.rows_inserted}</Text>
                <Text as="p">Rows failed: {summary.rows_failed}</Text>
                {summary.failure_examples?.length ? (
                  <BlockStack gap="050">
                    <Text variant="headingSm" as="p">
                      Failure examples
                    </Text>
                    {summary.failure_examples.slice(0, 5).map((f: any, idx: number) => (
                      <Text key={idx} as="p">
                        {f.error}
                      </Text>
                    ))}
                  </BlockStack>
                ) : (
                  <Text as="p">No failures recorded.</Text>
                )}
              </BlockStack>
            </LegacyCard>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default UploadPage;
