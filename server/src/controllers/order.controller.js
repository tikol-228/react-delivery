import { userService } from "../services/user.service.js";
import { orderService } from "../services/order.service.js";

export const orderController = {
  createUser: (req, res, next) => {
    try {
      const result = userService.createUser(req.body);
      res.status(201).json(result);
    } catch (e) {
      console.log(111, e);
      next(e);
    }
  },

  getAllOrders: (req, res, next) => {
    try {
      const result = orderService.getAllOrders();
      res.json(result);
    } catch (e) {
      next(e);
    }
  },

  getUser: (req, res, next) => {
    try {
      const result = userService.getUser(req.params.id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },

  updateUser: (req, res, next) => {
    try {
      const result = userService.updateUser(req.params.id, req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: (req, res, next) => {
    try {
      userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};