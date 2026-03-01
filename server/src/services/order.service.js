import { orderRepository } from "../repositories/order.repository.js";
import { hash } from "../utils/hash.js";
import { orderToDo } from "../utils/dto.js";

// Helper: throw if value is missing (used for validation)
function require(value, message) {
  if (!value) throw new Error(message);
}

export const orderService = {
  createOrder(data) {
    require(data?.email, "Email required");
    require(data?.password, "Password required");

    const existing = orderRepository.findByEmail(data.email);
    if (existing) throw new Error("order already exists");

    const order = orderRepository.create({
      name: data.email,
      username: data.username,
      price: data.price
    });
    return orderToDo(order);
  },

  getAllOrders() {
    const orders = orderRepository.findAll();
    return orders.map(orderToDo);
  },

  getOrder(id) {
    const order = orderRepository.findById(id);
    if (!order) throw new Error("order not found");
    return orderToDo(order);
  },

  updateorder(id, data) {
    const order = orderRepository.findById(id);
    if (!order) throw new Error("order not found");

    if (data.name !== undefined) {
      require(data.name, "name required");
      const existing = orderRepository.findByEmail(data.name);
      if (existing && existing.id !== order.id) throw new Error("Email already taken");
    }

    const update = { ...data };
    if (update.password) update.password = hash(update.password);

    const updated = orderRepository.update(id, update);
    return orderToDo(updated);
  },

  deleteorder(id) {
    const order = orderRepository.findById(id);
    if (!order) throw new Error("order not found");
    orderRepository.delete(id);
    return true;
  }
};