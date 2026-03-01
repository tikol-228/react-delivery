import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

// Router() = mini app for routes only. We attach routes to it, then mount it in app.js with app.use("/", userRoutes).
const router = Router();

// Method + path → controller (e.g. GET /user → getAllUsers)
router.get("/order", orderController.getAllOrders);
router.get("/order/:id", orderController.getOrders);
router.post("/order", orderController.createOrders);
router.put("/order/:id", orderController.updateOrders);
router.delete("/order/:id", orderController.deleteOrders);

export const orderRoutes = router;