import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middleware/authMiddleware";
import {
  handleValidationErrors,
  validateEdit,
  validateLogin,
  validateRegister,
} from "./user.validator";
import { roleMiddleware } from "../../middleware/roleMiddleware";

const router = Router();
const controller = new UserController();

router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  controller.createUser.bind(controller),
);
router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  controller.loginUser.bind(controller),
);

router.get("/me", authMiddleware, controller.quickLogin.bind(controller));
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.getAllUsers.bind(controller),
);

router.patch(
  "/edit/:id",
  authMiddleware,
  validateEdit,
  handleValidationErrors,
  controller.editAccount.bind(controller),
);

router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  controller.deleteUser.bind(controller),
);
export default router;
