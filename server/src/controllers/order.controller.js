import { orderService } from "../services/order.service.js";

export const orderController = {
  createOrder: (req, res, next) => {
    try {
      const result = orderService.createOrder(req.body);
      res.status(201).json(result);
    } catch (e) {
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

  getOrder: (req, res, next) => {
    try {
      const result = orderService.getOrder(req.params.id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },

  updateOrder: (req, res, next) => {
    try {
      const result = orderService.updateOrder(req.params.id, req.body);
      res.json(result);
    } catch (e) {
      next(e);
    }
  },

  deleteOrder: (req, res, next) => {
    try {
      orderService.deleteOrder(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
};