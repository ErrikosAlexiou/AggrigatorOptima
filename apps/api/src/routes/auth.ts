import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "../prisma";
import { config } from "../config";
import { LoginSchema, RegisterSchema } from "@aggregator-optima/shared";
import { AuthRequest, requireAuth, signAccessToken, signRefreshToken } from "../middleware/auth";
import type { Role } from "../middleware/auth";

const router = Router();

router.post("/register", async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });
  }
  const { email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email already registered" });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash, role: "USER" }
  });
  return res.status(201).json({ id: user.id, email: user.email, role: user.role });
});

router.post("/login", async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input", errors: parsed.error.flatten() });
  }
  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const tokenId = crypto.randomUUID();
  const accessToken = signAccessToken({ id: user.id, email: user.email, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, email: user.email, role: user.role }, tokenId);
  const expiresAt = new Date(Date.now() + config.refreshTokenTtlDays * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({
    data: {
      id: tokenId,
      token: refreshToken,
      userId: user.id,
      expiresAt
    }
  });
  res.cookie(config.cookieName, refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: config.nodeEnv === "production",
    maxAge: config.refreshTokenTtlDays * 24 * 60 * 60 * 1000,
    path: "/"
  });
  return res.json({
    accessToken,
    user: { id: user.id, email: user.email, role: user.role }
  });
});

router.post("/refresh", async (req, res) => {
  const token = req.cookies?.[config.cookieName];
  if (!token) {
    return res.status(401).json({ message: "Missing refresh token" });
  }
  try {
    const decoded = jwt.verify(token, config.refreshTokenSecret) as {
      id: number;
      email: string;
      role: Role;
      tid: string;
      exp: number;
    };
    const stored = await prisma.refreshToken.findUnique({ where: { id: decoded.tid } });
    if (!stored || stored.revoked || stored.token !== token || stored.expiresAt < new Date()) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    await prisma.refreshToken.update({
      where: { id: decoded.tid },
      data: { revoked: true }
    });
    const newTokenId = crypto.randomUUID();
    const accessToken = signAccessToken({ id: decoded.id, email: decoded.email, role: decoded.role });
    const newRefreshToken = signRefreshToken(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      newTokenId
    );
    const expiresAt = new Date(Date.now() + config.refreshTokenTtlDays * 24 * 60 * 60 * 1000);
    await prisma.refreshToken.create({
      data: {
        id: newTokenId,
        token: newRefreshToken,
        userId: decoded.id,
        expiresAt
      }
    });
    res.cookie(config.cookieName, newRefreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: config.nodeEnv === "production",
      maxAge: config.refreshTokenTtlDays * 24 * 60 * 60 * 1000,
      path: "/"
    });
    return res.json({ accessToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

router.post("/logout", async (req, res) => {
  const token = req.cookies?.[config.cookieName];
  if (token) {
    try {
      const decoded = jwt.verify(token, config.refreshTokenSecret) as { tid: string };
      await prisma.refreshToken.updateMany({ where: { id: decoded.tid }, data: { revoked: true } });
    } catch {
      // ignore bad token on logout
    }
  }
  res.clearCookie(config.cookieName, { path: "/" });
  return res.json({ message: "Logged out" });
});

router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  const user = req.user
    ? await prisma.user.findUnique({ where: { id: req.user.id }, select: { id: true, email: true, role: true, createdAt: true } })
    : null;
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({ user });
});

export default router;
