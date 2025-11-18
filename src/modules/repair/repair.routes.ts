import { Router } from "express";
import { RepairController } from "./repair.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();
const controller = new RepairController();

router.post("/", controller.createRepair.bind(controller));
router.get("/", authMiddleware, controller.getAllRepair.bind(controller));
router.post("/filter", controller.filterRepair.bind(controller));
router.get("/me", controller.getAllRepairUser.bind(controller));
router.patch("/status/:id", controller.editStatus.bind(controller));
router.get("/:id", controller.getRepairById.bind(controller));

export default router;
