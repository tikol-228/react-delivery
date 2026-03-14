import { db } from "../db.js";

export const orderRepository = {
  findById: (id) => db.orders.findById(id),
  findAll: () => db.orders.findAll(),
  create: (data) => db.orders.create(data),
  update: (id, data) => db.orders.update(id, data),
  delete: (id) => db.orders.delete(id)
};
