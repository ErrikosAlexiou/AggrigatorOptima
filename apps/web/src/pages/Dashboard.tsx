import { useEffect, useMemo, useState } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  BlockStack,
  InlineStack,
  Text,
  Select,
  Button,
  Banner
} from "@shopify/polaris";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/client";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

type Metrics = {
  totals: {
    observations: number;
    deforestationCount: number;
    avg_ndvi: number;
    avg_tree_cover: number;
  };
  byMonth: Array<{ month: number; observations: number; deforestationCount: number; avgTreeCover: number }>;
  byCountryPart: Array<{ countryPart: string; observations: number; deforestationCount: number; avgTreeCover: number }>;
  year?: number;
};

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DashboardPage = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [year, setYear] = useState<string>("");
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [params] = useSearchParams();

  useEffect(() => {
    loadYears();
  }, []);

  useEffect(() => {
    loadMetrics(year);
  }, [year]);

  const loadYears = async () => {
    try {
      const resp = await api.get("/api/v1/observations", { params: { pageSize: 100 } });
      const years = Array.from(new Set((resp.data.data as any[]).map((o) => o.year))).sort((a, b) => b - a);
      setYearOptions(years.map(String));
      if (years.length && !year) setYear(String(years[0]));
    } catch {
      setYearOptions([]);
    }
  };

  const loadMetrics = async (yearValue: string) => {
    setError(null);
    try {
      const resp = await api.get("/api/v1/metrics/summary", {
        params: yearValue ? { year: Number(yearValue) } : undefined
      });
      setMetrics(resp.data);
    } catch (err) {
      setError("Unable to load metrics.");
    }
  };

  const exportCsv = () => {
    if (!metrics) return;
    const lines = [
      "metric,value",
      `observations,${metrics.totals.observations}`,
      `deforestation_count,${metrics.totals.deforestationCount}`,
      `avg_ndvi,${metrics.totals.avg_ndvi.toFixed(3)}`,
      `avg_tree_cover,${metrics.totals.avg_tree_cover.toFixed(2)}`
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "aggregator-summary.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const monthlyData = useMemo(() => {
    return (metrics?.byMonth || [])
      .map((m) => ({ ...m, label: monthLabels[m.month - 1] || m.month.toString() }))
      .sort((a, b) => a.month - b.month);
  }, [metrics]);

  return (
    <Page
      title="Dashboard"
      subtitle="Monitor ingestion health and vegetation signals"
      primaryAction={{ content: "Export summary", onAction: exportCsv }}>
      <Layout>
        <Layout.Section>
          {params.get("status") === "loggedin" && (
            <Banner tone="success" title="Welcome back">
              You are signed in.
            </Banner>
          )}
          {params.get("status") === "welcome" && (
            <Banner tone="success" title="Account created">
              Your account is ready. Start by exploring the dashboard.
            </Banner>
          )}
          {error && (
            <Banner tone="critical" title="Error">
              {error}
            </Banner>
          )}
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
            <InlineStack align="space-between">
              <Text variant="headingMd" as="h2">
                Filters
              </Text>
              <Select
                labelHidden
                label="Year"
                placeholder="Select year"
                options={yearOptions.map((y) => ({ label: y, value: y }))}
                value={year}
                onChange={setYear}
              />
            </InlineStack>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <LegacyCard title="Total observations" sectioned>
            <Text variant="headingXl" as="p">
              {metrics?.totals.observations ?? 0}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <LegacyCard title="Deforestation flagged" sectioned>
            <Text variant="headingXl" as="p">
              {metrics?.totals.deforestationCount ?? 0}
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section oneThird>
          <LegacyCard title="Average NDVI" sectioned>
            <Text variant="headingXl" as="p">
              {(metrics?.totals.avg_ndvi ?? 0).toFixed(3)}
            </Text>
            <Text as="p" variant="bodySm">
              Avg tree cover: {(metrics?.totals.avg_tree_cover ?? 0).toFixed(2)}%
            </Text>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard title="Deforestation by month" sectioned>
            {monthlyData.length ? (
              <div style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="deforestationCount" stroke="#bf0711" />
                    <Line type="monotone" dataKey="observations" stroke="#007b5e" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <Text as="p">No monthly data yet.</Text>
            )}
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard title="Tree cover by country part" sectioned>
            {metrics?.byCountryPart?.length ? (
              <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.byCountryPart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="countryPart" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgTreeCover" fill="#00848e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <Text as="p">No data segmented by region.</Text>
            )}
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default DashboardPage;
