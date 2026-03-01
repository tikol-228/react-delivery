import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import MenuContent from "@/components/MenuContent";
import OrderPanel from "@/components/OrderPanel";
import { MenuItem, OrderItem } from "@/data/menuData";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

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

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <MenuContent onAddItem={handleAddItem} />
      <OrderPanel items={orderItems} onUpdateQty={handleUpdateQty} onRemove={handleRemove} />
    </div>
  );
};

export default Index;
