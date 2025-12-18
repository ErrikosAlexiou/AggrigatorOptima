import { useEffect, useMemo, useState } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  DataTable,
  TextField,
  Select,
  Button,
  InlineGrid,
  Pagination,
  Modal,
  Text,
  BlockStack
} from "@shopify/polaris";
import { api } from "../api/client";

type Observation = {
  id: number;
  observationId: number;
  cellId: string;
  lat: number;
  lon: number;
  acquisitionDate: string;
  year: number;
  month: number;
  sensor: string;
  ndvi: number;
  evi: number;
  cloudCoverPct: number;
  landCoverType: string;
  baselineTreeCoverPct: number;
  treeCoverPct: number;
  deforestationFlag: number;
  deforestationAmountPct: number;
  disturbanceType: string;
  countryPart: string;
  priorityConservationArea: number;
};

const DataPage = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [data, setData] = useState<Observation[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<Observation | null>(null);

  useEffect(() => {
    loadData().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  const loadData = async (overrideFilters = filters) => {
    const params: any = { page, pageSize };
    Object.entries(overrideFilters).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    try {
      const resp = await api.get("/api/v1/observations", { params });
      setData(resp.data.data);
      setTotal(resp.data.total);
    } catch (err) {
      setData([]);
      setTotal(0);
    }
  };

  const applyFilters = () => {
    setPage(1);
    loadData(filters);
  };

  const rows = useMemo(
    () =>
      data.map((o) => [
        o.observationId,
        o.year,
        o.month,
        o.sensor,
        o.landCoverType,
        o.treeCoverPct.toFixed(2),
        o.cloudCoverPct.toFixed(1),
        o.deforestationFlag ? "Yes" : "No"
      ]),
    [data]
  );

  return (
    <Page
      title="Data"
      subtitle="Browse ingested observations"
      primaryAction={{ content: "Refresh", onAction: () => loadData() }}>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Filters" sectioned>
            <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
              <TextField
                label="Year"
                value={filters.year || ""}
                onChange={(value) => setFilters((f) => ({ ...f, year: value }))}
              />
              <TextField
                label="Month"
                value={filters.month || ""}
                onChange={(value) => setFilters((f) => ({ ...f, month: value }))}
              />
              <TextField
                label="Country part"
                value={filters.country_part || ""}
                onChange={(value) => setFilters((f) => ({ ...f, country_part: value }))}
              />
              <TextField
                label="Land cover type"
                value={filters.land_cover_type || ""}
                onChange={(value) => setFilters((f) => ({ ...f, land_cover_type: value }))}
              />
              <Select
                label="Deforestation"
                options={[
                  { label: "Any", value: "" },
                  { label: "Flagged", value: "1" },
                  { label: "Clear", value: "0" }
                ]}
                value={filters.deforestation_flag || ""}
                onChange={(value) => setFilters((f) => ({ ...f, deforestation_flag: value }))}
              />
              <TextField
                label="Sensor"
                value={filters.sensor || ""}
                onChange={(value) => setFilters((f) => ({ ...f, sensor: value }))}
              />
              <TextField
                label="From date (YYYY-MM-DD)"
                value={filters.fromDate || ""}
                onChange={(value) => setFilters((f) => ({ ...f, fromDate: value }))}
              />
              <TextField
                label="To date (YYYY-MM-DD)"
                value={filters.toDate || ""}
                onChange={(value) => setFilters((f) => ({ ...f, toDate: value }))}
              />
              <TextField
                label="Min tree cover %"
                value={filters.minTreeCover || ""}
                onChange={(value) => setFilters((f) => ({ ...f, minTreeCover: value }))}
              />
              <TextField
                label="Max cloud cover %"
                value={filters.maxCloudCover || ""}
                onChange={(value) => setFilters((f) => ({ ...f, maxCloudCover: value }))}
              />
            </InlineGrid>
            <div style={{ marginTop: "16px" }}>
              <InlineGrid columns={{ xs: 1, sm: 2 }} gap="400" alignItems="center">
                <Button primary onClick={applyFilters}>
                  Apply filters
                </Button>
                <Button
                  onClick={() => {
                    setFilters({});
                    setPage(1);
                    loadData({});
                  }}>
                  Reset
                </Button>
              </InlineGrid>
            </div>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard>
            <LegacyCard.Section>
              <DataTable
                columnContentTypes={["text", "numeric", "numeric", "text", "text", "numeric", "numeric", "text"]}
                headings={["Observation", "Year", "Month", "Sensor", "Land cover", "Tree cover %", "Cloud %", "Deforestation"]}
                rows={rows}
                onRowClick={(_, index) => setSelected(data[index])}
              />
            </LegacyCard.Section>
            <LegacyCard.Section>
              <Pagination
                hasNext={page * pageSize < total}
                hasPrevious={page > 1}
                onNext={() => setPage((p) => p + 1)}
                onPrevious={() => setPage((p) => Math.max(1, p - 1))}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={`Observation ${selected?.observationId || ""}`}>
        <Modal.Section>
          {selected && (
            <BlockStack gap="200">
              <Text as="p">Cell: {selected.cellId}</Text>
              <Text as="p">Lat/Lon: {selected.lat}, {selected.lon}</Text>
              <Text as="p">Date: {new Date(selected.acquisitionDate).toLocaleDateString()}</Text>
              <Text as="p">Sensor: {selected.sensor}</Text>
              <Text as="p">Land cover: {selected.landCoverType}</Text>
              <Text as="p">Tree cover: {selected.treeCoverPct.toFixed(2)}%</Text>
              <Text as="p">NDVI: {selected.ndvi.toFixed(3)}</Text>
              <Text as="p">EVI: {selected.evi.toFixed(3)}</Text>
              <Text as="p">Cloud cover: {selected.cloudCoverPct}%</Text>
              <Text as="p">
                Deforestation: {selected.deforestationFlag ? "Yes" : "No"} (
                {selected.deforestationAmountPct}%)
              </Text>
              <Text as="p">Disturbance: {selected.disturbanceType}</Text>
              <Text as="p">Country part: {selected.countryPart}</Text>
              <Text as="p">Priority area: {selected.priorityConservationArea}</Text>
            </BlockStack>
          )}
        </Modal.Section>
      </Modal>
    </Page>
  );
};

export default DataPage;
