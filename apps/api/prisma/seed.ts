import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.refreshToken.deleteMany();
  await prisma.observation.deleteMany();
  await prisma.user.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.uploadHistory.deleteMany();

  const adminPasswordHash = await bcrypt.hash("AdminPass123!", 10);
  const userPasswordHash = await bcrypt.hash("UserPass123!", 10);

  await prisma.user.createMany({
    data: [
      { email: "admin@example.com", passwordHash: adminPasswordHash, role: "ADMIN" },
      { email: "user@example.com", passwordHash: userPasswordHash, role: "USER" }
    ]
  });

  const sampleObservations = [
    {
      observationId: 1,
      cellId: "A-100",
      lat: 45.12,
      lon: -71.4,
      acquisitionDate: new Date("2023-01-15"),
      year: 2023,
      month: 1,
      sensor: "Sentinel-2",
      ndvi: 0.52,
      evi: 0.31,
      cloudCoverPct: 5.5,
      landCoverType: "Forest",
      baselineTreeCoverPct: 60.2,
      treeCoverPct: 62.1,
      deforestationFlag: 0,
      deforestationAmountPct: 0,
      disturbanceType: "None",
      countryPart: "North",
      priorityConservationArea: 1
    },
    {
      observationId: 2,
      cellId: "A-200",
      lat: 46.9,
      lon: -70.9,
      acquisitionDate: new Date("2023-06-12"),
      year: 2023,
      month: 6,
      sensor: "Landsat-8",
      ndvi: 0.43,
      evi: 0.29,
      cloudCoverPct: 12.2,
      landCoverType: "Wetland",
      baselineTreeCoverPct: 55.5,
      treeCoverPct: 51.2,
      deforestationFlag: 1,
      deforestationAmountPct: 4.3,
      disturbanceType: "Logging",
      countryPart: "South",
      priorityConservationArea: 0
    },
    {
      observationId: 3,
      cellId: "B-010",
      lat: 44.2,
      lon: -69.1,
      acquisitionDate: new Date("2024-03-05"),
      year: 2024,
      month: 3,
      sensor: "PlanetScope",
      ndvi: 0.61,
      evi: 0.38,
      cloudCoverPct: 3.1,
      landCoverType: "Forest",
      baselineTreeCoverPct: 70.1,
      treeCoverPct: 68.4,
      deforestationFlag: 1,
      deforestationAmountPct: 1.7,
      disturbanceType: "Fire",
      countryPart: "North",
      priorityConservationArea: 1
    }
  ];

  await prisma.observation.createMany({ data: sampleObservations });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
