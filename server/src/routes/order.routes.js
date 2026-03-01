import { Router } from "express";
import { orderController } from "../controllers/order.controller.js";

// Router() = mini app for routes only. We attach routes to it, then mount it in app.js with app.use("/", userRoutes).
const router = Router();

// When mounted at `/orders` these become:
// GET    /orders       -> getAllOrders
// GET    /orders/:id   -> getOrder
// POST   /orders       -> createOrder
// PUT    /orders/:id   -> updateOrder
// DELETE /orders/:id   -> deleteOrder
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export const orderRoutes = router;