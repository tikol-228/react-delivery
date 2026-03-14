import { Router } from "express";
import { menuController } from "../controllers/menu.controller.js";

const router = Router();

// GET /menu -> getAllMenuItems
router.get("/", menuController.getAllMenuItems);

export const menuRoutes = router;
