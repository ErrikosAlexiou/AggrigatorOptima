import { Router } from "express";
import { ContactSchema } from "@aggregator-optima/shared";
import { prisma } from "../prisma";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });
  }
  const message = await prisma.contactMessage.create({ data: parsed.data });
  return res.status(201).json({ id: message.id, createdAt: message.createdAt });
});

export default router;
