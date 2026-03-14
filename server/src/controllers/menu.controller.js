import { db } from "../db.js";

export const menuController = {
  getAllMenuItems: (_req, res) => {
    try {
      const menu = db.menu.findAll();
      res.json(menu);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
