import { Router } from "express";
import { CategoryController } from "./category.controller";

const router = Router();
const controller = new CategoryController();

router.post("/", controller.createCategory.bind(controller));
router.get("/", controller.getAllCategory.bind(controller));
router.get("/count", controller.getAllWithCount.bind(controller));
router.get("/:id", controller.getCategoryById.bind(controller));

export default router;
