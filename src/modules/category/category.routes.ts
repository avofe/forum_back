import { Router } from "express";
import { CategoryController } from "./category.controller";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { authMiddleware } from "../../middleware/authMiddleware";
import { validateCategory } from "./category.validator";
import { handleValidationErrors } from "../../middleware/validation";

const router = Router();
const controller = new CategoryController();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  validateCategory,
  handleValidationErrors,
  controller.createCategory.bind(controller),
);
router.get("/", controller.getAllCategory.bind(controller));
router.get("/count", controller.getAllWithCount.bind(controller));
router.get("/:id", controller.getCategoryById.bind(controller));
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.updateCategory.bind(controller),
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.deleteCategory.bind(controller),
);

export default router;
