import { Router } from "express";
import { RepairController } from "./repair.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";
import { validateRepair } from "./repair.validator";
import { handleValidationErrors } from "../../middleware/validation";

const router = Router();
const controller = new RepairController();

router.post("/", validateRepair, handleValidationErrors, controller.createRepair.bind(controller));
router.get("/", authMiddleware, controller.getAllRepair.bind(controller));
router.post("/filter", controller.filterRepair.bind(controller));
router.get("/me", authMiddleware, controller.getAllRepairUser.bind(controller));
router.patch(
  "/status/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.editStatus.bind(controller),
);
router.get("/:id", authMiddleware, controller.getRepairById.bind(controller));
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.deleteRepair.bind(controller),
);

export default router;
