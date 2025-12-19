import { Router } from "express";
import { UserController } from "./user.controller";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();
const controller = new UserController();

router.post("/register", controller.createUser.bind(controller));
router.post("/login", controller.loginUser.bind(controller));

router.get("/me", authMiddleware, controller.quickLogin.bind(controller));
router.get("/all", authMiddleware, controller.getAllUsers.bind(controller));

router.patch("/edit/:id", controller.editAccount.bind(controller));

export default router;
