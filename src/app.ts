import express from "express";
import cors from "cors";

import productRoutes from "./modules/products/product.routes";
import categoryRoutes from "./modules/category/category.routes";
import repairRoutes from "./modules/repair/repair.routes";
import userRoutes from "./modules/users/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/repair", repairRoutes);
app.use("/api/users", userRoutes);

export default app;
