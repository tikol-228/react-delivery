/**
 * APP ENTRY POINT
 * Creates Express app, mounts routes, and global error handler.
 * Flow: HTTP request → route → controller → service → repository → response
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { userRoutes } from "./routes/user.routes.js";
import { orderRoutes } from "./routes/order.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// allow cross‑origin requests (useful during development when
// the frontend is running on a different port)
app.use(cors());

// Parse JSON body (e.g. req.body in POST/PUT)
app.use(express.json());

// if a production build of the React app exists, serve it from Express
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "../../react-delivery/dist");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(staticPath));
}

// All user endpoints live under /user, /user/:id
app.use("/user", userRoutes);
app.use("/orders", orderRoutes);

// fallback to index.html for any other route when serving static files
if (process.env.NODE_ENV === "production") {
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

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
