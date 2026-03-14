import { orderRepository } from "../repositories/order.repository.js";
import { toOrderDto } from "../utils/dto.js";

// Helper: throw if value is missing (used for validation)
function require(value, message) {
  if (!value) throw new Error(message);
}

// compute totals from items
function computeTotals(items) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
  const total = subtotal; // could adjust for tax/discounts later
  return { subtotal, total };
}

export const orderService = {
  createOrder(data) {
    require(data?.items && Array.isArray(data.items) && data.items.length > 0, "Order items required");
    require(data?.type, "Order type required");

    const { subtotal, total } = computeTotals(data.items);

    const order = orderRepository.create({
      items: data.items,
      type: data.type,
      subtotal,
      total,
      status: "pending"
    });

    return toOrderDto(order);
  },

  getAllOrders() {
    const orders = orderRepository.findAll();
    return orders.map(toOrderDto);
  },

  getOrder(id) {
    const order = orderRepository.findById(id);
    if (!order) throw new Error("order not found");
    return toOrderDto(order);
  },

  updateOrder(id, data) {
    const order = orderRepository.findById(id);
    if (!order) throw new Error("order not found");

    const update = { ...data };
    // if items provided, recalc totals
    if (update.items) {
      const { subtotal, total } = computeTotals(update.items);
      update.subtotal = subtotal;
      update.total = total;
    }

    const updated = orderRepository.update(id, update);
    return toOrderDto(updated);
  },

  deleteOrder(id) {
    const order = orderRepository.findById(id);
    if (!order) throw new Error("order not found");
    orderRepository.delete(id);
    return true;
  }
};