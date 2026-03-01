/**
 * DTO = Data Transfer Object
 * Returns only safe fields for the client (no password, internal fields).
 * Used whenever we send a user in the response.
 */

export function toOrderDto(order) {
  if (!order) return null;
  return { id: order.id, name: order.name, price: order.price };
}