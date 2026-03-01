/**
 * USER ROUTES
 * Maps HTTP method + path to controller function.
 * Only job: "for this URL, call this controller".
 */

import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

// Router() = mini app for routes only. We attach routes to it, then mount it in app.js with app.use("/", userRoutes).
const router = Router();

// Method + path → controller (e.g. GET /user → getAllUsers)
router.get("/user", userController.getAllUsers);
router.get("/user/:id", userController.getUser);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);

export const userRoutes = router;
