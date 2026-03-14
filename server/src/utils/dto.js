/**
 * DTO = Data Transfer Object
 * Returns only safe fields for the client (no password, internal fields).
 * Used whenever we send a user in the response.
 */

export function toOrderDto(order) {
  if (!order) return null;
  // return the full order except any internal fields
  const { id, items, type, subtotal, total, status, createdAt } = order;
  return { id, items, type, subtotal, total, status, createdAt };
}

export function toUserDto(user) {
  if (!user) return null;
  return { id: user.id, email: user.email };
}