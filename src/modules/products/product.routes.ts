import { Router } from "express";
import { UserController } from "./product.controller";
import { upload } from "./multer";
import { authMiddleware } from "../../middleware/authMiddleware";
import { roleMiddleware } from "../../middleware/roleMiddleware";

const router = Router();
const controller = new UserController();

router.post(
  "/",
  upload.single("image"),
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.createProduct.bind(controller),
);
router.get("/", controller.getAllProducts.bind(controller));

router.get("/search", controller.findProductsByName.bind(controller));

router.get("/filter", controller.filterProducts.bind(controller));

router.get("/:id", controller.getProductById.bind(controller));
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.updateProduct.bind(controller),
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.deleteProduct.bind(controller),
);

export default router;
