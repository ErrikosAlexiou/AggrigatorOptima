import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { AuthRequest, requireAuth, requireRole } from "../middleware/auth";
import { RegisterSchema } from "@aggregator-optima/shared";

const router = Router();

router.get("/users", requireAuth, requireRole("ADMIN"), async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" }
  });
  return res.json({ users });
});

router.post("/users", requireAuth, requireRole("ADMIN"), async (req: AuthRequest, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });
  }
  const { email, password, role } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email already exists" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, role: role || "USER" }
  });
  return res.status(201).json({ user: { id: user.id, email: user.email, role: user.role } });
});

router.delete("/users/:id", requireAuth, requireRole("ADMIN"), async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  await prisma.user.delete({ where: { id } }).catch(() => null);
  return res.json({ message: "Deleted" });
});

export default router;
