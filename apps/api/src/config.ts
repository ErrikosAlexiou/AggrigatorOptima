import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: process.env.API_ENV_PATH || ".env" });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });

export const config = {
  port: process.env.API_PORT ? Number(process.env.API_PORT) : 4000,
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || "dev-access-secret",
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || "dev-refresh-secret",
  accessTokenTtlMinutes: 15,
  refreshTokenTtlDays: 7,
  webOrigin: process.env.WEB_ORIGIN || "http://localhost:5173",
  cookieName: "refreshToken",
  nodeEnv: process.env.NODE_ENV || "development"
};
