/**
 * APP ENTRY POINT
 * Creates Express app, mounts routes, and global error handler.
 * Flow: HTTP request → route → controller → service → repository → response
 */

import express from "express";
import { userRoutes } from "./routes/user.routes.js";
import { orderRoutes } from "./routes/order.routes.js";

const app = express();
const PORT = 3001;

// Parse JSON body (e.g. req.body in POST/PUT)
app.use(express.json());

// All user endpoints live under /user, /user/:id
app.use("/", userRoutes);
app.use("/orders", orderRoutes);

// Global error handler: catches errors passed to next(err) from any controller
app.use((err, _req, res, _next) => {
  console.error("[Error handler]", err.message);
  const message = err.message || "Internal server error";
  const status = message === "User not found" ? 404 : 400;
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
  console.log("Users: GET/POST /user, GET/PUT/DELETE /user/:id");
});
