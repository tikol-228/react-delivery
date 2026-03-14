import { useState, useCallback } from "react";
import MenuContent from "@/components/MenuContent";
import OrderPanel, { OrderType } from "@/components/OrderPanel";
import { MenuItem, OrderItem } from "@/data/menuData";
import { createOrder } from "@/lib/orderApi";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("Dine In");

  const handleAddItem = useCallback((item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((o) => o.id === item.id);
      if (existing) {
        return prev.map((o) =>
          o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, image: item.image, quantity: 1 }];
    });
  }, []);

  const handleUpdateQty = useCallback((id: number, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((o) => (o.id === id ? { ...o, quantity: o.quantity + delta } : o))
        .filter((o) => o.quantity > 0)
    );
  }, []);

  const handleRemove = useCallback((id: number) => {
    setOrderItems((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const handleCheckout = useCallback(async () => {
    if (orderItems.length === 0) {
      toast({ title: "No items", description: "Add some items before checking out.", variant: "destructive" });
      return;
    }

    try {
      const order = await createOrder({ items: orderItems, type: orderType });
      toast({ title: "Order placed", description: `Order #${order.id} created successfully.` });
      setOrderItems([]);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to place order", variant: "destructive" });
    }
  }, [orderItems, orderType]);

  return (
    <div className="flex flex-1">
      <MenuContent onAddItem={handleAddItem} />
      <OrderPanel
        items={orderItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        orderType={orderType}
        onTypeChange={setOrderType}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
