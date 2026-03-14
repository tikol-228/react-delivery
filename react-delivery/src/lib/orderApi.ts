import { OrderItem, MenuItem } from "@/data/menuData";
import { OrderType } from "@/components/OrderPanel";

export interface OrderDto {
  id: number;
  items: OrderItem[];
  type: OrderType;
  subtotal: number;
  total: number;
  status: string;
  createdAt: string;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  type: OrderType;
}

const API_BASE = "/orders";

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch("/menu");
  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }
  return res.json();
}

export async function createOrder(payload: CreateOrderPayload): Promise<OrderDto> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create order");
  }
  const data = await res.json();
  return data as OrderDto;
}

export async function fetchOrders(): Promise<OrderDto[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  return res.json();
}

export async function updateOrder(id: number, data: Partial<CreateOrderPayload> & { status?: string }): Promise<OrderDto> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update order");
  }
  return res.json();
}

export async function deleteOrder(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete order");
  }
}
