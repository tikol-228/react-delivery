/**
 * USER CONTROLLER
 * Handles HTTP only: read req, call service, send res.
 * Does NOT know about DB or business rules — only about request/response.
 */

import { userService } from "../services/user.service.js";

export const userController = {
  createUser: (req, res, next) => {
    try {
      const result = userService.createUser(req.body);
      res.status(201).json(result);
    } catch (e) {
      console.log(111, e);
      next(e);
    }
  },

  getAllUsers: (req, res, next) => {
    try {
      const result = userService.getAllUsers();
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
