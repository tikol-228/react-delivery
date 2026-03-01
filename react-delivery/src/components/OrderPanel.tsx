import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { OrderItem } from "@/data/menuData";

interface OrderPanelProps {
  items: OrderItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

type OrderType = "Dine In" | "To Go" | "Delivery";

const OrderPanel = ({ items, onUpdateQty, onRemove }: OrderPanelProps) => {
  const [orderType, setOrderType] = useState<OrderType>("Dine In");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="w-[380px] min-h-screen bg-card flex flex-col border-l border-border">
      {/* Header */}
      <div className="p-6 pb-4">
        <h2 className="text-xl font-bold text-foreground mb-1">Orders #34562</h2>

        {/* Order type tabs */}
        <div className="flex items-center gap-2 mt-4">
          {(["Dine In", "To Go", "Delivery"] as OrderType[]).map((type) => (
            <button
              key={type}
              onClick={() => setOrderType(type)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                orderType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-pos-card-hover"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Order items table header */}
      <div className="px-6 py-3 flex items-center text-xs text-muted-foreground font-semibold border-b border-border">
        <span className="flex-1">Item</span>
        <span className="w-16 text-center">Qty</span>
        <span className="w-16 text-right">Price</span>
        <span className="w-8"></span>
      </div>

      {/* Order items */}
      <div className="flex-1 overflow-y-auto px-6">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No items added yet
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 py-4 border-b border-border">
              <img
                src={item.image}
                alt={item.name}
                className="w-11 h-11 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">$ {item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQty(item.id, -1)}
                  className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-foreground hover:bg-pos-card-hover transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-semibold text-foreground w-5 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQty(item.id, 1)}
                  className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-foreground hover:bg-pos-card-hover transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-sm font-semibold text-foreground w-16 text-right">
                $ {(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => onRemove(item.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="p-6 border-t border-border">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-muted-foreground">Discount</span>
          <span className="text-foreground font-medium">$ {discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-6">
          <span className="text-muted-foreground">Sub total</span>
          <span className="text-foreground font-medium">$ {subtotal.toFixed(2)}</span>
        </div>
        <button className="w-full h-12 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default OrderPanel;
