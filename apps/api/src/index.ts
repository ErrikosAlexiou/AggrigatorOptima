import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { config } from "./config";
import authRoutes from "./routes/auth";
import observationRoutes from "./routes/observations";
import metricsRoutes from "./routes/metrics";
import uploadRoutes from "./routes/uploads";
import adminRoutes from "./routes/admin";
import contactRoutes from "./routes/contact";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: config.webOrigin,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/observations", observationRoutes);
app.use("/api/v1/metrics", metricsRoutes);
app.use("/api/v1/uploads", uploadRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/contact", contactRoutes);

app.use((_req, res) => res.status(404).json({ message: "Not found" }));

app.listen(config.port, () => {
  console.log(`API listening on http://localhost:${config.port}`);
});
