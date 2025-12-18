import { Router } from "express";
import multer from "multer";
import { parse } from "csv-parse";
import { Readable } from "stream";
import { prisma } from "../prisma";
import { AuthRequest, requireAuth, requireRole } from "../middleware/auth";
import { Observation, ObservationSchema } from "@aggregator-optima/shared";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const router = Router();

const REQUIRED_COLUMNS = [
  "observation_id",
  "cell_id",
  "lat",
  "lon",
  "acquisition_date",
  "year",
  "month",
  "sensor",
  "ndvi",
  "evi",
  "cloud_cover_pct",
  "land_cover_type",
  "baseline_tree_cover_pct",
  "tree_cover_pct",
  "deforestation_flag",
  "deforestation_amount_pct",
  "disturbance_type",
  "country_part",
  "priority_conservation_area"
];

function normalizeRecord(record: Record<string, string>) {
  const cleaned: any = {};
  for (const col of REQUIRED_COLUMNS) {
    const value = (record[col] ?? "").toString().trim();
    cleaned[col] = value;
  }

  const allEmpty = Object.values(cleaned).every((v) => v === "");
  if (allEmpty) return { skip: true };

  const numbers = [
    "observation_id",
    "lat",
    "lon",
    "year",
    "month",
    "ndvi",
    "evi",
    "cloud_cover_pct",
    "baseline_tree_cover_pct",
    "tree_cover_pct",
    "deforestation_flag",
    "deforestation_amount_pct",
    "priority_conservation_area"
  ];

  for (const numField of numbers) {
    const parsed = Number(cleaned[numField]);
    if (Number.isNaN(parsed)) {
      return { error: `${numField} is invalid` };
    }
    cleaned[numField] = parsed;
  }

  if (!cleaned.acquisition_date) {
    return { error: "acquisition_date is required" };
  }
  if (Number.isNaN(new Date(cleaned.acquisition_date).getTime())) {
    return { error: "acquisition_date is invalid" };
  }

  return { data: cleaned as Observation };
}

router.post("/csv", requireAuth, upload.single("file"), async (req: AuthRequest, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "CSV file is required" });
  }

  let headerChecked = false;
  let rowsReceived = 0;
  let rowsFailed = 0;
  const validRows: Observation[] = [];
  const failureExamples: Array<{ row: any; error: string }> = [];

  try {
    await new Promise<void>((resolve, reject) => {
      const parser = parse({
        columns: (header) => header.map((h) => h.trim()),
        skip_empty_lines: true,
        trim: true,
        relax_column_count: true
      });

      parser.on("readable", () => {
        let record: any;
        while ((record = parser.read())) {
          if (!headerChecked) {
            const missing = REQUIRED_COLUMNS.filter((col) => !(col in record));
            if (missing.length) {
              reject(new Error(`Missing required columns: ${missing.join(", ")}`));
              return;
            }
            headerChecked = true;
          }
          const normalized = normalizeRecord(record);
          if (normalized.skip) continue;
          rowsReceived += 1;
          if (normalized.error || !normalized.data) {
            rowsFailed += 1;
            if (failureExamples.length < 20) {
              failureExamples.push({ row: record, error: normalized.error || "Invalid row" });
            }
            continue;
          }
          const validation = ObservationSchema.safeParse(normalized.data);
          if (!validation.success) {
            rowsFailed += 1;
            if (failureExamples.length < 20) {
              failureExamples.push({
                row: record,
                error: validation.error.errors.map((e) => e.message).join("; ")
              });
            }
            continue;
          }
          validRows.push(validation.data);
        }
      });

      parser.on("error", (err) => reject(err));
      parser.on("end", () => resolve());

      Readable.from(req.file!.buffer.toString()).pipe(parser);
    });
  } catch (err: any) {
    return res.status(400).json({ message: err.message || "Failed to parse CSV" });
  }

  if (!headerChecked) {
    return res.status(400).json({ message: "No data rows found. Ensure headers are present." });
  }

  let rowsInserted = 0;
  if (validRows.length) {
    const payload = validRows.map((row) => ({
      observationId: row.observation_id,
      cellId: row.cell_id,
      lat: row.lat,
      lon: row.lon,
      acquisitionDate: new Date(row.acquisition_date),
      year: row.year,
      month: row.month,
      sensor: row.sensor,
      ndvi: row.ndvi,
      evi: row.evi,
      cloudCoverPct: row.cloud_cover_pct,
      landCoverType: row.land_cover_type,
      baselineTreeCoverPct: row.baseline_tree_cover_pct,
      treeCoverPct: row.tree_cover_pct,
      deforestationFlag: row.deforestation_flag,
      deforestationAmountPct: row.deforestation_amount_pct,
      disturbanceType: row.disturbance_type,
      countryPart: row.country_part,
      priorityConservationArea: row.priority_conservation_area
    }));
    const result = await prisma.observation.createMany({ data: payload });
    rowsInserted = result.count;
  }

  await prisma.uploadHistory.create({
    data: {
      filename: req.file.originalname,
      rowsReceived,
      rowsInserted,
      rowsFailed,
      failureExamples: failureExamples.length ? JSON.stringify(failureExamples) : null,
      uploadedById: req.user?.id
    }
  });

  return res.json({
    rows_received: rowsReceived,
    rows_inserted: rowsInserted,
    rows_failed: rowsFailed,
    failure_examples: failureExamples
  });
});

router.get("/", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const uploads = await prisma.uploadHistory.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { uploadedBy: { select: { email: true, id: true } } }
  });
  return res.json({ uploads });
});

export default router;
