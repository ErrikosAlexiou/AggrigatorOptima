import { Router } from "express";
import { prisma } from "../prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/summary", requireAuth, async (req, res) => {
  const yearParam = req.query.year ? Number(req.query.year) : undefined;
  let selectedYear = yearParam;
  if (!selectedYear) {
    const latest = await prisma.observation.findFirst({
      orderBy: { year: "desc" },
      select: { year: true }
    });
    selectedYear = latest?.year;
  }

  const totalsAgg = await prisma.observation.aggregate({
    _count: { _all: true },
    _avg: { ndvi: true, treeCoverPct: true }
  });
  const deforestationCount = await prisma.observation.count({
    where: { deforestationFlag: { gt: 0 } }
  });

  let byMonth: Array<any> = [];
  if (selectedYear) {
    const monthAgg = await prisma.observation.groupBy({
      by: ["month"],
      where: { year: selectedYear },
      _count: { _all: true },
      _sum: { deforestationFlag: true },
      _avg: { treeCoverPct: true }
    });
    byMonth = monthAgg.map((m) => ({
      month: m.month,
      observations: m._count._all,
      deforestationCount: m._sum.deforestationFlag || 0,
      avgTreeCover: m._avg.treeCoverPct ?? 0
    }));
  }

  const countryAgg = await prisma.observation.groupBy({
    by: ["countryPart"],
    _count: { _all: true },
    _avg: { treeCoverPct: true },
    _sum: { deforestationFlag: true }
  });

  return res.json({
    totals: {
      observations: totalsAgg._count._all,
      deforestationCount,
      avg_ndvi: totalsAgg._avg.ndvi ?? 0,
      avg_tree_cover: totalsAgg._avg.treeCoverPct ?? 0
    },
    byMonth,
    byCountryPart: countryAgg.map((c) => ({
      countryPart: c.countryPart,
      observations: c._count._all,
      deforestationCount: c._sum.deforestationFlag || 0,
      avgTreeCover: c._avg.treeCoverPct ?? 0
    })),
    year: selectedYear
  });
});

export default router;
