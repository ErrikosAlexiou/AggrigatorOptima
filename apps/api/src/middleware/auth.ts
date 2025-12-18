import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { prisma } from "../prisma";

export type Role = "ADMIN" | "USER";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: Role;
  };
}

export function signAccessToken(payload: { id: number; email: string; role: Role }) {
  return jwt.sign(payload, config.accessTokenSecret, { expiresIn: `${config.accessTokenTtlMinutes}m` });
}

export function signRefreshToken(payload: { id: number; email: string; role: Role }, tokenId: string) {
  return jwt.sign({ ...payload, tid: tokenId }, config.refreshTokenSecret, {
    expiresIn: `${config.refreshTokenTtlDays}d`
  });
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing authorization header" });
  }
  const token = authHeader.substring("Bearer ".length);
  try {
    const decoded = jwt.verify(token, config.accessTokenSecret) as {
      id: number;
      email: string;
      role: Role;
    };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireRole(role: Role) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

export async function revokeRefreshToken(tokenId: string) {
  await prisma.refreshToken.updateMany({
    where: { id: tokenId },
    data: { revoked: true }
  });
}
