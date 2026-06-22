import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import productRoutes from "./modules/products/product.routes";
import categoryRoutes from "./modules/category/category.routes";
import repairRoutes from "./modules/repair/repair.routes";
import userRoutes from "./modules/users/user.routes";
import path from "path";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/repair", repairRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api") && !req.path.startsWith("/uploads")) {
      res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
    }
  });
}

app.use(errorHandler);

export default app;
