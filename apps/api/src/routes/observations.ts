import { Router } from "express";
import { ObservationFiltersSchema } from "@aggregator-optima/shared";
import { prisma } from "../prisma";
import { AuthRequest, requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = ObservationFiltersSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid filters", errors: parsed.error.flatten() });
  }
  const {
    page = 1,
    pageSize = 20,
    year,
    month,
    country_part,
    land_cover_type,
    deforestation_flag,
    sensor,
    fromDate,
    toDate,
    minTreeCover,
    maxCloudCover
  } = parsed.data;

  const where: any = {};
  if (year) where.year = year;
  if (month) where.month = month;
  if (country_part) where.countryPart = country_part;
  if (land_cover_type) where.landCoverType = land_cover_type;
  if (deforestation_flag !== undefined) where.deforestationFlag = deforestation_flag;
  if (sensor) where.sensor = sensor;
  if (fromDate || toDate) {
    where.acquisitionDate = {};
    if (fromDate) where.acquisitionDate.gte = new Date(fromDate);
    if (toDate) where.acquisitionDate.lte = new Date(toDate);
  }
  if (minTreeCover !== undefined) {
    where.treeCoverPct = { gte: minTreeCover };
  }
  if (maxCloudCover !== undefined) {
    where.cloudCoverPct = { lte: maxCloudCover };
  }

  const total = await prisma.observation.count({ where });
  const data = await prisma.observation.findMany({
    where,
    orderBy: { acquisitionDate: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  return res.json({ data, page, pageSize, total });
});

export default router;
