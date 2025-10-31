import { Router } from "express";
import { UserController } from "./product.controller";

const router = Router();
const controller = new UserController();

router.post("/", controller.createProduct.bind(controller));
router.get("/", controller.getAllProducts.bind(controller));

router.get("/search", controller.findProductsByName.bind(controller));

router.get("/filter", controller.filterProducts.bind(controller));

router.get("/:id", controller.getProductById.bind(controller));
router.put("/:id", controller.updateProduct.bind(controller));
router.delete("/:id", controller.deleteProduct.bind(controller));

export default router;
